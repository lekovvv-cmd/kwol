import kwolIcon from '@icons/kwol.svg';
import ringIcon from '@icons/ring.svg';
import gridIcon from '@icons/grid.svg';


export default function Header() {
  return (
    <header className="flex items-center justify-center sm:justify-between px-4 sm:px-[144px] py-4 bg-white shadow-lg h-[72px] z-20">
      <img src={kwolIcon} alt="kwol" className="h-8 sm:h-10 w-auto" />

      <div className="hidden sm:flex gap-[16px] items-center">
        <img
          src={ringIcon}
          alt="notifications"
          className="w-8 h-8 cursor-pointer opacity-70 hover:opacity-100 transition"
        />
        <img
          src={gridIcon}
          alt="menu"
          className="w-8 h-8 cursor-pointer opacity-70 hover:opacity-100 transition"
        />
      </div>
    </header>
  );
}
