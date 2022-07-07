import { useEffect, useState } from 'react';
import ReviewList from './ReviewList';
import { getReviews } from '../api';

function App() {
    const [order, setOrder] = useState('createdAt');
    const [items, setItems] = useState([]);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder('createdAt');

    const handleBestClick = () => setOrder('rating');

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async () => {
        const { reviews } = await getReviews();
        setItems(reviews);
    };

    // 홈페이지 리로드 할때마다 호출됨
    //// useEffect를 안쓰고 handleLoad()를 밖에다 쓰면, 무한 루프 발생 (데이터 가져오고, 렌더링되고 다시 데이터 가져오고..)
    //// useEffect와 빈배열을 쓰면 데이터 한번 가져오고 렌더링되고 끝
    useEffect(() => {
        console.log('a')
        handleLoad();
    }, []);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete} />
        </div>
    );
}

export default App;
