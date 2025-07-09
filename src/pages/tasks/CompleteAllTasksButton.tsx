"use client";
import { useTransition } from "react";
import { completeAllCompleted } from "./tasks";

export const CompleteAllTasksButton = () => {
	const [isPending, startTransition] = useTransition();
	return (
		<form action={() => startTransition(() => completeAllCompleted())}>
			<button
				type="submit"
				className="group btn btn-sm"
				disabled={isPending}
				data-loading={isPending ? "true" : undefined}
			>
				<span className="hidden group-data-loading:block group-data-loading:loading group-data-loading:loading-spinner group-data-loading:loading-xs" />
				Complete all
			</button>
		</form>
	);
};
