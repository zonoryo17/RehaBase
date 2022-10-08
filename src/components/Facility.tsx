const Facility = ({ data }: any) => {
  return (
    <div>
      <p>施設のマップリストを表示</p>
      {data?.map((item: any) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.menu}</p>
          <p>{item.price}</p>
          <p>{item.address}</p>
        </div>
      ))}
      <p>施設のマップリスト表示を終了</p>
    </div>
  );
};

export default Facility;
