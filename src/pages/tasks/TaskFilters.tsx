export const TaskFilters = ({
  filter,
}: {
  filter: "active" | "completed" | undefined;
}) => (
  <div className="join w-full">
    <TaskFilter currentFilter={filter}>
      All
    </TaskFilter>
    <TaskFilter filter="active" currentFilter={filter}>
      Active
    </TaskFilter>
    <TaskFilter filter="completed" currentFilter={filter}>
      Completed
    </TaskFilter>
  </div>
);

const TaskFilter = ({
  currentFilter,
  filter,
  children,
}: {
  currentFilter: "active" | "completed" | undefined;
  filter?: "active" | "completed";
  children: React.ReactNode;
}) => (
  <a
    href={`/${filter}`}
    data-active={currentFilter === filter ? true : undefined}
    className="basis-1/3 group btn btn-sm join-item data-active:btn-primary"
  >
    <span className="hidden group-data-loading:block group-data-loading:loading group-data-loading:loading-spinner group-data-loading:loading-xs" />
    {children}
  </a>
);
