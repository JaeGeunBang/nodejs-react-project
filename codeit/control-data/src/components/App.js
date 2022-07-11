import { useEffect, useState } from 'react';
import ReviewList from './ReviewList';
import { getReviews } from '../api';
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
    const [order, setOrder] = useState('createdAt');
    const [offset, setOffset] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const [items, setItems] = useState([]);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder('createdAt');

    const handleBestClick = () => setOrder('rating');

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (options) => {
        let result;
        try {
            setLoadingError(null);
            setIsLoading(true);
            result = await getReviews(options);
        } catch (error) {
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }

        const { paging, reviews } = result;
        if (options.offset === 0) {
            setItems(reviews);
        } else {
            setItems((prevItems) => [...prevItems, ...reviews]);
        }
        setOffset(options.offset + options.limit);
        setHasNext(paging.hasNext);
    };

    const handleLoadMore = async () => {
        await handleLoad({ order, offset, limit: LIMIT });
    };

    // 홈페이지 리로드 할때마다 호출됨
    //// useEffect를 안쓰고 handleLoad()를 밖에다 쓰면, 무한 루프 발생 (데이터 가져오고, 렌더링되고 다시 데이터 가져오고..)
    //// useEffect와 빈배열을 쓰면 데이터 한번 가져오고 렌더링되고 끝
    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewForm></ReviewForm>
            <ReviewList items={sortedItems} onDelete={handleDelete} />
            {hasNext && (
                <button disabled={isLoading} onClick={handleLoadMore}>
                    더 보기
                </button>
            )}
            {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
    );
}

export default App;
