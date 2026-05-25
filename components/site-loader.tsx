"use client";

import { useEffect, useState } from "react";

export function SiteLoader() {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setIsVisible(false);
		}, 900);

		return () => window.clearTimeout(timeout);
	}, []);

	if (!isVisible) {
		return null;
	}

	return (
		<div aria-label="Loading site" className="site-loader" role="status">
			<div className="site-loader-mark">
				<span />
				<span />
				<span />
				<span />
			</div>
			<p>Aditya Patel</p>
		</div>
	);
}
