const Topbar = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-700">
        Farmer Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button className="text-xl">🔔</button>

        <div className="flex items-center gap-2">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">Farmer</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
