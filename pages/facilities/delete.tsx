import { NextPage } from 'next';
import { supabase } from '../../src/utils/supabaseClient';

const deleteFacility = () => {
  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('Facilities')
        .delete()
        .eq('id', '5a3af2e5-f301-46f5-b513-d99023de45b7');
      alert('Facility deleted successfully');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>delete page</h1>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
};
export default deleteFacility;
