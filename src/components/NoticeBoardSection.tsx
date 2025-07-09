const NoticeBoardSection = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          🗒️ Notice Board
        </h2>
        <ul className="space-y-4">
          <li className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            🗓️ School will remain closed on 15th August for Independence Day.
          </li>
          <li className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            📢 Admission forms for 2025-26 are now available online.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default NoticeBoardSection;
