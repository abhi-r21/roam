export type FAQItem = {
    question: string;
    answer: string;
};

export const personalFAQs: FAQItem[] = [
    {
        question: "What is Yuvly?",
        answer:
            "Yuvly is an AI travel buddy that plans, books, and manages your travel end to end - flights, hotels, and everything in between - so you skip the endless tabs and back-and-forth.",
    },
    {
        question: "Is Yuvly right for me?",
        answer:
            "Anyone who travels and would rather not do the searching, comparing, and booking themselves. Yuvly's built to be a travel buddy - you say where you're going, and it takes it from there.",
    },
    {
        question: "Does Yuvly get to know my preferences over time?",
        answer:
            "Yes. Every trip you book with Yuvly helps it understand what you actually want - not just the cheapest flight, but the one that fits you - so recommendations get sharper the more you use it.",
    },
    {
        question: "What happens if my flight gets delayed or cancelled?",
        answer:
            "Yuvly's already on it before you have to ask - rebooking, adjusting your itinerary, sorting a cancellation. No calls, no waiting on hold, no chasing an airline yourself.",
    },
    {
        question: "Is my payment and booking information safe?",
        answer:
            "Yes. Every booking runs through a sandboxed, secure infrastructure layer, and at the point of booking you're notified and asked to approve it - nothing goes through without you seeing it first.",
    },
];

export const enterpriseFAQs: FAQItem[] = [
    {
        question: "How does Yuvly fit into how our company already works?",
        answer:
            "Yuvly plugs into Slack and calendars from day one - no new dashboard, no separate portal for employees to learn. A mention in a thread or an invite on someone's calendar is enough for it to start working.",
    },
    {
        question: "Can Yuvly book travel for the whole team at once?",
        answer:
            "Yes. A single request like booking the team's trip to SF gets every traveler planned and booked together, built from context - a Slack mention, a calendar invite, an offsite already in motion.",
    },
    {
        question: "Can we set spending limits and travel policy?",
        answer:
            "Yes. Admins set a budget ceiling, preferred airlines or hotels, and cabin class defaults, and Yuvly books within those guardrails automatically - no one has to check each booking by hand.",
    },
    {
        question: "What happens when a booking goes outside policy?",
        answer:
            "It waits for a single approval before going through - not a chain of them. Spend stays visible in one place the whole time, so finance never has to ask where something stands.",
    },
    {
        question: "How is pricing structured for teams?",
        answer:
            "Pricing depends on team size and how your company travels - reach out and let's talk through what fits.",
    },
];