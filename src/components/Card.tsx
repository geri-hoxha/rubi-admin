const Card = () => {
  return (
    <div className="group relative rounded-xl border border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,var(--color-sky-50)),var(--quick-links-hover-bg,var(--color-sky-50)))_padding-box,linear-gradient(to_top,var(--color-indigo-400),var(--color-cyan-400),var(--color-sky-500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:var(--color-slate-800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        <h2 className="mt-4 font-display text-base text-white">
          <a href="/">
            <span className="absolute -inset-px rounded-xl" />
            Installation
          </a>
        </h2>
        <p className="mt-1 text-sm  text-slate-400">
          Step-by-step guides to setting up your system and installing the
          library.
        </p>
      </div>
    </div>
  );
};

export default Card;
