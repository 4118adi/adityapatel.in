"use client";

import { useEffect, useRef } from "react";

type SectionJumpControllerProps = {
	sections: string[];
};

export function SectionJumpController({ sections: sectionLabels }: SectionJumpControllerProps) {
	const isJumping = useRef(false);
	const touchStartY = useRef(0);

	useEffect(() => {
		const getSections = () =>
			Array.from(document.querySelectorAll<HTMLElement>("[data-screen-section]"));

		function getActiveIndex(sections: HTMLElement[]) {
			const scrollTop = window.scrollY;
			let closestIndex = 0;
			let closestDistance = Number.POSITIVE_INFINITY;

			sections.forEach((section, index) => {
				const distance = Math.abs(section.offsetTop - scrollTop);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});

			return closestIndex;
		}

		function setActiveNav(index: number) {
			document
				.querySelectorAll<HTMLButtonElement>("[data-section-nav]")
				.forEach((button) => {
					button.dataset.active = String(button.dataset.sectionIndex === String(index));
				});
		}

		function jumpToIndex(nextIndex: number) {
			if (isJumping.current) {
				return;
			}

			const sections = getSections();
			const activeIndex = getActiveIndex(sections);
			const nextSection = sections[nextIndex];

			if (!nextSection || nextIndex === activeIndex) {
				return;
			}

			isJumping.current = true;
			document.body.classList.add("section-is-jumping");
			sections[activeIndex]?.classList.add("section-is-leaving");
			nextSection.classList.add("section-is-arriving");

			window.requestAnimationFrame(() => {
				setActiveNav(nextIndex);
				window.scrollTo({
					behavior: "smooth",
					top: nextSection.offsetTop,
				});
				sections[activeIndex]?.classList.remove("section-is-leaving");
			});

			window.setTimeout(() => {
				nextSection.classList.remove("section-is-arriving");
				document.body.classList.remove("section-is-jumping");
				isJumping.current = false;
			}, 760);
		}

		function jump(direction: 1 | -1) {
			const sections = getSections();
			const activeIndex = getActiveIndex(sections);
			jumpToIndex(activeIndex + direction);
		}

		function onWheel(event: WheelEvent) {
			event.preventDefault();

			const sections = getSections();

			if (sections.length === 0 || Math.abs(event.deltaY) < 18) {
				return;
			}

			jump(event.deltaY > 0 ? 1 : -1);
		}

		function onTouchStart(event: TouchEvent) {
			touchStartY.current = event.touches[0]?.clientY || 0;
		}

		function onTouchEnd(event: TouchEvent) {
			const touchEndY = event.changedTouches[0]?.clientY || 0;
			const delta = touchStartY.current - touchEndY;

			if (Math.abs(delta) < 48) {
				return;
			}

			jump(delta > 0 ? 1 : -1);
		}

		function onScroll() {
			if (!isJumping.current) {
				setActiveNav(getActiveIndex(getSections()));
			}
		}

		function onNavClick(event: Event) {
			const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
				"[data-section-nav]",
			);

			if (!button?.dataset.sectionIndex) {
				return;
			}

			jumpToIndex(Number(button.dataset.sectionIndex));
		}

		setActiveNav(getActiveIndex(getSections()));
		window.addEventListener("wheel", onWheel, { capture: true, passive: false });
		window.addEventListener("touchstart", onTouchStart, { passive: true });
		window.addEventListener("touchend", onTouchEnd, { passive: true });
		window.addEventListener("scroll", onScroll, { passive: true });
		document.addEventListener("click", onNavClick);

		return () => {
			window.removeEventListener("wheel", onWheel, { capture: true });
			window.removeEventListener("touchstart", onTouchStart);
			window.removeEventListener("touchend", onTouchEnd);
			window.removeEventListener("scroll", onScroll);
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
