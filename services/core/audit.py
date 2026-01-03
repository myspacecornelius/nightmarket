"""
Audit logging service for tracking security-sensitive events
"""
from typing import Optional
from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import Request

from services.models.audit_log import AuditLog, AuditLogEvent


class AuditLogger:
    """Service for creating audit log entries"""
    
    @staticmethod
    def log_event(
        db: Session,
        event_type: str,
        action: str,
        user_id: Optional[UUID] = None,
        username: Optional[str] = None,
        request: Optional[Request] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        metadata: Optional[dict] = None,
        success: bool = True,
        error_message: Optional[str] = None,
        severity: str = "INFO"
    ) -> AuditLog:
        """
        Create an audit log entry
        
        Args:
            db: Database session
            event_type: Type of event (use AuditLogEvent constants)
            action: Human-readable description of what happened
            user_id: UUID of the user who performed the action
            username: Username of the user
            request: FastAPI Request object (for IP/UA extraction)
            resource_type: Type of resource affected (e.g., "listing", "user")
            resource_id: ID of the affected resource
            metadata: Additional context as dictionary
            success: Whether the action succeeded
            error_message: Error message if failed
            severity: Log severity level
            
        Returns:
            Created AuditLog instance
        """
        # Extract request context if provided
        ip_address = None
        user_agent = None
        request_id = None
        
        if request:
            ip_address = request.client.host if request.client else None
            user_agent = request.headers.get("User-Agent")
            request_id = request.headers.get("X-Request-ID")
        
        # Create audit log entry
        audit_entry = AuditLog.create_event(
            event_type=event_type,
            action=action,
            user_id=user_id,
            username=username,
            ip_address=ip_address,
            user_agent=user_agent,
            request_id=request_id,
            resource_type=resource_type,
            resource_id=resource_id,
            metadata=metadata,
            success=success,
            error_message=error_message,
            severity=severity
        )
        
        db.add(audit_entry)
        db.commit()
        db.refresh(audit_entry)
        
        return audit_entry
    
    @staticmethod
    def log_login(
        db: Session,
        username: str,
        success: bool,
        request: Optional[Request] = None,
        user_id: Optional[UUID] = None,
        error_message: Optional[str] = None
    ):
        """Log a login attempt"""
        event_type = AuditLogEvent.USER_LOGIN if success else AuditLogEvent.USER_LOGIN_FAILED
        severity = "INFO" if success else "WARNING"
        
        return AuditLogger.log_event(
            db=db,
            event_type=event_type,
            action=f"User '{username}' login {'successful' if success else 'failed'}",
            user_id=user_id,
            username=username,
            request=request,
            success=success,
            error_message=error_message,
            severity=severity
        )
    
    @staticmethod
    def log_logout(
        db: Session,
        user_id: UUID,
        username: str,
        request: Optional[Request] = None
    ):
        """Log a logout event"""
        return AuditLogger.log_event(
            db=db,
            event_type=AuditLogEvent.USER_LOGOUT,
            action=f"User '{username}' logged out",
            user_id=user_id,
            username=username,
            request=request
        )
    
    @staticmethod
    def log_admin_action(
        db: Session,
        admin_id: UUID,
        admin_username: str,
        action: str,
        request: Optional[Request] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        metadata: Optional[dict] = None
    ):
        """Log an admin action"""
        return AuditLogger.log_event(
            db=db,
            event_type=AuditLogEvent.ADMIN_ACTION,
            action=action,
            user_id=admin_id,
            username=admin_username,
            request=request,
            resource_type=resource_type,
            resource_id=resource_id,
            metadata=metadata,
            severity="WARNING"  # Admin actions are always noteworthy
        )
    
    @staticmethod
    def log_laces_transaction(
        db: Session,
        transaction_type: str,
        user_id: UUID,
        username: str,
        amount: int,
        new_balance: int,
        request: Optional[Request] = None,
        related_resource_id: Optional[str] = None
    ):
        """Log a LACES transaction"""
        return AuditLogger.log_event(
            db=db,
            event_type=transaction_type,
            action=f"LACES transaction: {amount:+d} LACES (new balance: {new_balance})",
            user_id=user_id,
            username=username,
            request=request,
            resource_type="laces_transaction",
            resource_id=related_resource_id,
            metadata={
                "amount": amount,
                "new_balance": new_balance,
                "transaction_type": transaction_type
            }
        )
    
    @staticmethod
    def log_security_event(
        db: Session,
        event_type: str,
        action: str,
        request: Optional[Request] = None,
        user_id: Optional[UUID] = None,
        username: Optional[str] = None,
        metadata: Optional[dict] = None
    ):
        """Log a security-related event"""
        return AuditLogger.log_event(
            db=db,
            event_type=event_type,
            action=action,
            user_id=user_id,
            username=username,
            request=request,
            metadata=metadata,
            severity="ERROR"  # Security events are always high priority
        )
    
    @staticmethod
    def log_dropzone_event(
        db: Session,
        event_type: str,
        action: str,
        user_id: UUID,
        username: str,
        dropzone_id: str,
        request: Optional[Request] = None,
        metadata: Optional[dict] = None,
        success: bool = True,
        error_message: Optional[str] = None
    ):
        """Log a dropzone-related event"""
        return AuditLogger.log_event(
            db=db,
            event_type=event_type,
            action=action,
            user_id=user_id,
            username=username,
            request=request,
            resource_type="dropzone",
            resource_id=dropzone_id,
            metadata=metadata,
            success=success,
            error_message=error_message
        )


# Convenience function for quick access
def audit_log(
    db: Session,
    event_type: str,
    action: str,
    **kwargs
) -> AuditLog:
    """Convenience function for logging audit events"""
    return AuditLogger.log_event(db, event_type, action, **kwargs)
