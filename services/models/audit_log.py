"""
Audit logging model for tracking security-sensitive events
"""
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid

from services.database import Base


class AuditLogEvent:
    """Enum-like class for audit event types"""
    USER_LOGIN = "USER_LOGIN"
    USER_LOGOUT = "USER_LOGOUT"
    USER_LOGIN_FAILED = "USER_LOGIN_FAILED"
    TOKEN_REFRESH = "TOKEN_REFRESH"
    TOKEN_REVOKED = "TOKEN_REVOKED"
    
    # LACES economy events
    LACES_GRANT = "LACES_GRANT"
    LACES_SPEND = "LACES_SPEND"
    LACES_DAILY_STIPEND = "LACES_DAILY_STIPEND"
    LACES_BOOST_SENT = "LACES_BOOST_SENT"
    
    # Admin actions
    ADMIN_ACTION = "ADMIN_ACTION"
    ADMIN_GRANT_LACES = "ADMIN_GRANT_LACES"
    ADMIN_USER_MODIFY = "ADMIN_USER_MODIFY"
    ADMIN_CONTENT_MODERATE = "ADMIN_CONTENT_MODERATE"
    
    # Security events
    FAILED_AUTH = "FAILED_AUTH"
    PRIVILEGE_ESCALATION_ATTEMPT = "PRIVILEGE_ESCALATION_ATTEMPT"
    SUSPICIOUS_ACTIVITY = "SUSPICIOUS_ACTIVITY"
    ACCOUNT_LOCKED = "ACCOUNT_LOCKED"
    PASSWORD_CHANGED = "PASSWORD_CHANGED"
    
    # Dropzone events
    DROPZONE_CREATED = "DROPZONE_CREATED"
    DROPZONE_CHECKIN = "DROPZONE_CHECKIN"
    DROPZONE_CHECKIN_FAILED = "DROPZONE_CHECKIN_FAILED"


class AuditLog(Base):
    """
    Audit log table for security and compliance tracking.
    Immutable records of security-sensitive events.
    """
    __tablename__ = "audit_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Event information
    event_type = Column(String(100), nullable=False, index=True)
    event_category = Column(String(50), nullable=False, index=True)  # auth, admin, economy, security
    severity = Column(String(20), nullable=False, default="INFO")  # DEBUG, INFO, WARNING, ERROR, CRITICAL
    
    # Actor information
    user_id = Column(UUID(as_uuid=True), index=True, nullable=True)  # Nullable for failed auth attempts
    username = Column(String(100), index=True, nullable=True)
    
    # Request context
    ip_address = Column(String(45), nullable=True, index=True)  # IPv4 or IPv6
    user_agent = Column(Text, nullable=True)
    request_id = Column(String(100), nullable=True, index=True)
    
    # Event details
    action = Column(String(255), nullable=False)  # Human-readable action description
    resource_type = Column(String(100), nullable=True)  # e.g., "listing", "dropzone", "user"
    resource_id = Column(String(100), nullable=True, index=True)  # ID of affected resource
    
    # Additional metadata (flexible JSON storage)
    metadata = Column(JSONB, nullable=True)  # Additional context, varies by event type
    
    # Outcome
    success = Column(String(1), nullable=False, default='1')  # '1' = success, '0' = failure
    error_message = Column(Text, nullable=True)  # If failed, why?
    
    # Timestamp
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    
    def __repr__(self):
        return f"<AuditLog(id={self.id}, event={self.event_type}, user={self.username}, action={self.action})>"
    
    @classmethod
    def create_event(
        cls,
        event_type: str,
        action: str,
        user_id: uuid.UUID = None,
        username: str = None,
        ip_address: str = None,
        user_agent: str = None,
        request_id: str = None,
        resource_type: str = None,
        resource_id: str = None,
        metadata: dict = None,
        success: bool = True,
        error_message: str = None,
        severity: str = "INFO"
    ):
        """Factory method to create audit log entry"""
        
        # Determine category from event type
        category = "general"
        if event_type.startswith("USER_") or event_type.startswith("TOKEN_"):
            category = "auth"
        elif event_type.startswith("ADMIN_"):
            category = "admin"
        elif event_type.startswith("LACES_"):
            category = "economy"
        elif event_type in [AuditLogEvent.FAILED_AUTH, AuditLogEvent.PRIVILEGE_ESCALATION_ATTEMPT]:
            category = "security"
        elif event_type.startswith("DROPZONE_"):
            category = "dropzone"
        
        return cls(
            event_type=event_type,
            event_category=category,
            severity=severity,
            user_id=user_id,
            username=username,
            ip_address=ip_address,
            user_agent=user_agent,
            request_id=request_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            metadata=metadata,
            success='1' if success else '0',
            error_message=error_message
        )
