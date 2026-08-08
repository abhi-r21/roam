import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const footerColumns = [
    {
        title: "Social",
        links: [
            { label: "X (formerly Twitter)", href: "https://x.com/yuvlyai" },
            { label: "LinkedIn", href: "https://linkedin.com/company/yuvly" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Blog", href: "#" },
            { label: "Brand", href: "#" },
            { label: "Contact Us", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Privacy Policy", href: "#" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="w-full bg-neutral-50 py-16 my-20">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row items-start px-6">
                <div className={cn("flex items-center relative")}>
                    <Image src={"/yuvly_new.svg"} alt="logo" width={50} height={50} loading="eager" />
                    <p className="font-sans text-2xl tracking-tighter font-medium absolute -right-11">
                        Yuvly
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-10  md:gap-20">
                    {footerColumns.map((column) => (
                        <div key={column.title} className="flex flex-col gap-4">
                            <h3 className="font-is text-xl text-neutral-950">
                                {column.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}