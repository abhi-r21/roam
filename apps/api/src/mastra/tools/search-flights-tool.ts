import { z } from "zod"
import { createTool } from "@mastra/core/tools"

export const searchFlightsTool = createTool({
    id: "get-flights",
    description: "Gets the flights avaliable for user",
    inputSchema: z.object({
        whereFrom: z.string().describe("The departure city.").min(3),
        whereTo: z.string().describe("The destination city.").min(3),
        tripType: z
            .enum(["round-trip", "one-way", "multi-city"])
            .describe(
                "The type of journey. Use 'one-way' for a single flight, 'round-trip' when the traveler returns to the departure location, and 'mutli-city' when multiple destinations are involved."
            )
            .default("one-way"),
        departure: z
            .coerce
            .date()
            .describe(
                "The departure date of the flight. If the user specifies a date, use it. Otherwise, omit the field or use the default."
            ),
        return: z
            .coerce
            .date()
            .describe(
                "The return travel date. Required only when the trip type is 'round-trip'. Leave undefined for one-way trips."
            )
            .optional(),
            passengers: z
            .object({
                adults: z
                    .number()
                    .describe("Number of adult passengers (typically age 12 or older).")
                    .default(1),
                children: z
                    .number()
                    .describe(
                        "Number of child passengers (typically between ages 2 and 11)."
                    )
                    .default(0),
                infants: z
                    .number()
                    .describe(
                        "Number of infants requiring their own seat (usually under 2 years old)."
                    )
                    .default(0),
                infantsOnLap: z
                    .number()
                    .describe(
                        "Number of infants traveling on an accompanying adult's lap without a separate seat."
                    )
                    .default(0),
            })
            .describe(
                "Breakdown of passengers traveling, categorized by age and seating requirements."
            ),
        flightType: z
            .enum(["economy", "premium-economy", "business", "first"])
            .describe(
                "Preferred cabin class for the flight. Defaults to economy if the user does not specify a preference."
            )
            .default("economy"),
    }),
    outputSchema: z.object({

    }),
    execute: async inputData => {
        const { whereFrom, whereTo, departure, flightType, passengers, tripType, return: returnFlight } = inputData
        
        
        // Do the websearch
        // handle this to browseragent
        // prolly do a workflow of tasks here
        // <!--  search flights include 
        //     1. Go to the page
        //     2. Fill in details
        //     3. Get the details of flights avaliable
        //     4. And show them to user
        // -->
        
    }
})