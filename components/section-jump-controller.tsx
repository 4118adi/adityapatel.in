"use client";

import { useEffect } from "react";

type SectionJumpControllerProps = {
        sections: string[];
};

export function SectionJumpController({ sections: sectionLabels }: SectionJumpControllerProps) {
        useEffect(() => {
                const sections = Array.from(
                        document.querySelectorAll<HTMLElement>("[data-screen-section]"),
                );

                const navButtons = Array.from(
                        document.querySelectorAll<HTMLButtonElement>("[data-section-nav]"),
                );

                if (sections.length === 0) {
                        return;
                }

                function setActiveNav(index: number) {
                        navButtons.forEach((button) => {
                                button.dataset.active = String(
                                        button.dataset.sectionIndex === String(index),
                                );
                        });
                }

                const observer = new IntersectionObserver(
                        (entries) => {
                                const activeEntry = entries
                                        .filter((entry) => entry.isIntersecting)
                                        .sort(
                                                (a, b) => b.intersectionRatio - a.intersectionRatio,
                                        )[0];

                                if (!activeEntry) {
                                        return;
                                }

                                const index = sections.findIndex(
                                        (section) => section === activeEntry.target,
                                );

                                if (index !== -1) {
                                        setActiveNav(index);
                                }
                        },
                        {
                                threshold: 0.6,
                        },
                );

                sections.forEach((section) => {
                        observer.observe(section);
                });

                function onNavClick(event: Event) {
                        const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
                                "[data-section-nav]",
                        );

                        if (!button?.dataset.sectionIndex) {
                                return;
                        }

                        const index = Number(button.dataset.sectionIndex);
                        const targetSection = sections[index];

                        if (!targetSection) {
                                return;
                        }

                        targetSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                        });
                }

                document.addEventListener("click", onNavClick);

                return () => {
                        observer.disconnect();
                        document.removeEventListener("click", onNavClick);
                };
        }, []);

        return (
                <nav aria-label="Section navigation" className="section-nav">
                        {sectionLabels.map((label, index) => (
                                <button
                                        aria-label={`Jump to ${label}`}
                                        className="section-nav-button"
                                        data-active={index === 0}
                                        data-section-index={index}
                                        data-section-nav
                                        key={label}
                                        type="button"
                                >
                                        <span className="section-nav-label">{label}</span>
                                </button>
                        ))}
                </nav>
        );
}