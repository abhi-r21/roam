import { Hono } from "hono";
import { STATUS } from "@/utils/status-codes";

const organizationRouter = new Hono();

/**
 * 1. Get all the pending invitation details
 * 2. Get all members of org details to display
 */

organizationRouter.get("/members", async (c) => {
    const clerkClient = c.get("clerk");
    const auth = c.get("clerkAuth");

    const { userId, orgId } = auth();
    // will check the user has access to it
    // then they are part of the org
    // will show them org member details

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
                members: data,
            },
            metadata: {
                totalCount
            }
        })
    } catch (error) {

    }
});
