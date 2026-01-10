"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Crown, Shield, User, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Member {
  id: string;
  role: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface MemberListProps {
  members: Member[];
  currentUserId: string;
  canManage: boolean;
  onAddMember?: () => void;
  onRoleChange?: (memberId: string, role: string) => void;
  onRemoveMember?: (member: Member) => void;
}

const roleIcons: Record<string, typeof User> = {
  owner: Crown,
  admin: Shield,
  member: User,
  viewer: Eye,
};

const roleLabels: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};

export function MemberList({
  members,
  currentUserId,
  canManage,
  onAddMember,
  onRoleChange,
  onRemoveMember,
}: MemberListProps) {
  // Sort members: owner first, then by role, then by name
  const sortedMembers = [...members].sort((a, b) => {
    const roleOrder = { owner: 0, admin: 1, member: 2, viewer: 3 };
    const aOrder = roleOrder[a.role as keyof typeof roleOrder] ?? 4;
    const bOrder = roleOrder[b.role as keyof typeof roleOrder] ?? 4;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return (a.user.name || a.user.email).localeCompare(b.user.name || b.user.email);
  });

  return (
    <div className="space-y-4">
      {canManage && onAddMember && (
        <div className="flex justify-end">
          <Button size="sm" onClick={onAddMember}>
            <UserPlus className="h-4 w-4 mr-1" />
            Add Member
          </Button>
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Added</TableHead>
              {canManage && <TableHead className="w-[100px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((member) => {
              const Icon = roleIcons[member.role] || User;
              const isOwner = member.role === "owner";
              const isSelf = member.user.id === currentUserId;

              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {(member.user.name || member.user.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">
                          {member.user.name || member.user.email.split("@")[0]}
                          {isSelf && <span className="text-muted-foreground ml-1">(you)</span>}
                        </div>
                        <div className="text-sm text-muted-foreground">{member.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {canManage && !isOwner ? (
                      <Select
                        value={member.role}
                        onValueChange={(value) => onRoleChange?.(member.id, value)}
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <div className="flex items-center gap-1.5">
                            <Icon className="h-4 w-4" />
                            <span>{roleLabels[member.role]}</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-4 w-4" />
                        <span>{roleLabels[member.role]}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(member.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  {canManage && (
                    <TableCell>
                      {!isOwner && !isSelf && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-destructive hover:text-destructive"
                          onClick={() => onRemoveMember?.(member)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
