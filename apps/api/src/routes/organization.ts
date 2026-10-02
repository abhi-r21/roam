import { Hono } from "hono";
import { STATUS } from "@/utils/status-codes";

const organization = new Hono();


organization.get("/members", async (c) => {
    const clerkClient = c.get("clerk");
    const auth = c.get("clerkAuth");

    const { userId, orgId } = auth();

    if (!orgId) {
        return c.json({ message: "No active organization" }, STATUS.NOT_FOUND);
    }
    try {
        const { data, totalCount } = await clerkClient.organizations.getOrganizationMembershipList({
            organizationId: orgId,
            limit: 10
        });

        return c.json({
            message: "OK",
            data: {
                members: data.map((d) => ({
                    memberId: d.id,
                    orgId: d.organization.id,
                    emailAddress: d.publicUserData?.identifier ?? "",
                    userId: d.publicUserData?.userId ?? "",
                    imageUrl: d.publicUserData?.imageUrl ?? "",
                    role: d.role,
                })),
            },
            metadata: {
                totalCount
            }
        })
    } catch (error) {
        console.error(error);
        return c.json({ message: "Something went wrong" }, STATUS.INTERNAL_SERVER_ERROR)
    }
});

organization.patch("/member/change", async (c) => {
    const clerkClient = c.get("clerk");
    const auth = c.get("clerkAuth");
    const { userId, orgId, has } = auth();

    if(!orgId) {
        return c.json({ message: "Invalid Access"}, STATUS.FORBIDDEN)
    }

    try {
        const role = c.req.query("role");
        const memberUserId = c.req.query("memberUserId")

        // does current user has access to change i.e is admin
        const isAdmin = has({ role: "admin" });
        if (!isAdmin) {
            return c.json({ message: "Invalid access"}, STATUS.FORBIDDEN);
        }

        if (role) {
            if (!memberUserId) {
                return c.json({ message: "Invalid Params"}, STATUS.UNPROCESSABLE_ENTITY)
            }

            const response = await clerkClient.organizations.updateOrganizationMembership({
                organizationId: orgId,
                role,
                userId: memberUserId
            })
        }

        return c.json({ message: "Updated successfully"}, STATUS.OK);

    } catch (error) {
        console.error(error);
        return c.json({ message: "Something went wrong"}, STATUS.INTERNAL_SERVER_ERROR);
    }
});

organization.delete("/remove-member", async (c) => {
    const clerkClient = c.get("clerk");
    const auth = c.get("clerkAuth");
    const { userId, orgId, has } = auth();

    const memberUserId = c.req.query("memberUserId");

    try {
        if (!memberUserId || !orgId) {
            return c.json({ message: "Invalid params" }, STATUS.UNPROCESSABLE_ENTITY);
        }

        const isAdmin = has({ role: "admin" });
        if (!isAdmin) {
            return c.json({ message: "Invalid Access" }, STATUS.FORBIDDEN)
        }


        await clerkClient.organizations.deleteOrganizationMembership({ organizationId: orgId, userId: memberUserId })

        return c.json({ message: "Removed successfully" }, STATUS.OK)
    } catch (error) {
        console.error(error);
        return c.json({ message: "Something went wrong" }, STATUS.INTERNAL_SERVER_ERROR)
    }
})

export { organization }
