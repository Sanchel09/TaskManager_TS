interface SearchTaskProps {
  searchData: string;
  handleSearchDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchTask({
  searchData,
  handleSearchDataChange,
}: SearchTaskProps) {
  return (
    <div className="flex items-center gap-2 mb-5!">
      <input
        type="text"
        value={searchData}
        onChange={handleSearchDataChange}
        name="title"
        className="flex-grow border border-gray-300 px-4! py-2! rounded font-semibold"
        placeholder="Search Task"
      />
    </div>
  );
}
