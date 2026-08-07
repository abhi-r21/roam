export type FAQItem = {
    question: string;
    answer: string;
};

export const personalFAQs: FAQItem[] = [
    {
        question: "What is Yuvly?",
        answer:
            "Yuvly is an AI travel buddy that plans, books, and manages your trips end to end - flights, hotels, and everything in between - so you skip the endless tabs and back-and-forth with travel agencies.",
    },
    {
        question: "How is this different from a travel agency?",
        answer:
            "A travel agency works on your itinerary, then hands you links to book yourself. Yuvly does the planning and the booking - you just confirm what you want and it handles the rest, adjusting in real time if plans change.",
    },
    {
        question: "How does Yuvly find and book flights or hotels?",
        answer:
            "Yuvly searches across airlines and hotel sites, compares options against your preferences and budget, and books directly through trusted booking infrastructure - no manual copy-pasting of confirmation codes.",
    },
    {
        question: "What happens if my flight gets delayed or cancelled?",
        answer:
            "Yuvly monitors your bookings and proactively rebooks or adjusts your itinerary when disruptions happen, and lets you know what changed and why.",
    },
    {
        question: "Is my payment and personal information safe?",
        answer:
            "Yes. Bookings go through secure, licensed travel infrastructure providers, and your payment details are never stored in plain text or shared beyond what's needed to complete a booking.",
    },
];

export const enterpriseFAQs: FAQItem[] = [
    {
        question: "Can Yuvly handle travel for a whole team?",
        answer:
            "Yes. Yuvly can manage bookings for multiple travelers under one account, with shared preferences, budgets, and approval flows for company travel.",
    },
    {
        question: "Does Yuvly integrate with our expense or HR tools?",
        answer:
            "Yuvly is built to plug into common expense and travel-management workflows so bookings and receipts flow into your existing systems without manual entry.",
    },
    {
        question: "Can we set travel policies and spending limits?",
        answer:
            "Yes. Admins can configure budget caps, preferred airlines or hotel chains, and approval requirements, and Yuvly books within those guardrails automatically.",
    },
    {
        question: "Who do we contact for support on enterprise plans?",
        answer:
            "Enterprise accounts get a dedicated point of contact for onboarding, billing, and any travel issues that come up, separate from general customer support.",
    },
    {
        question: "How is pricing structured for teams?",
        answer:
            "Enterprise pricing is based on the number of travelers and booking volume - reach out and we'll put together a plan that fits your team's travel needs.",
    },
];