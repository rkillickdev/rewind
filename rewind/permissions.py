from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Establish whether the user is the owner of the object.
    Return Boolean value dependent on this.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
