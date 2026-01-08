---
trigger: always_on
---

# Domain Guardrails

## Marketplace Objects
- User
- Listing
- Inventory/Variant
- Cart
- Order
- Payment
- Shipment
- Payout
- Dispute

## Required Fields
Every object must have:
- `id`
- `status`
- `createdAt`
- `updatedAt`
- Audit fields

## Status Machines
- Status machines must be explicit using enums and defined transitions
- No "magic strings" allowed
