export const TaskFilters = ({
  filter,
}: {
  filter: "active" | "completed" | undefined;
}) => (
  <div className="join w-full">
    <a
      href="/"
      data-active={filter == null ? true : undefined}
      className="basis-1/3 group btn btn-sm join-item data-active:btn-primary"
    >
      <span className="hidden group-data-loading:block group-data-loading:loading group-data-loading:loading-spinner group-data-loading:loading-xs" />
      All
    </a>
    <a
      href="/active"
      data-active={filter === "active" ? true : undefined}
      className="basis-1/3 group btn btn-sm join-item data-active:btn-primary"
    >
      <span className="hidden group-data-loading:block group-data-loading:loading group-data-loading:loading-spinner group-data-loading:loading-xs" />
      Active
    </a>
    <a
      href="/completed"
      data-active={filter === "completed" ? true : undefined}
      className="basis-1/3 group btn btn-sm join-item data-active:btn-primary"
    >
      <span className="hidden group-data-loading:block group-data-loading:loading group-data-loading:loading-spinner group-data-loading:loading-xs" />
      Completed
    </a>
  </div>
);
