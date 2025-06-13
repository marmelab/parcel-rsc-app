export const Header = () => (
  <header>
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          Todo
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
);
