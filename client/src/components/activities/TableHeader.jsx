function TableHeader({ heading }) {
  return (
    // <th scope="col" className="bg-green-600 px-2 py-4 text-white">
    //   {heading}
    // </th>
    <th
      scope="col"
      className="px-6 py-3 text-left text-sm font-bold uppercase text-grey-100"
    >
      {heading}
    </th>
  );
}

export default TableHeader;
