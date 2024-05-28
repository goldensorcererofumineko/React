import React, { useEffect, useState } from 'react';
import './Test.css'; // Test.cssをインポート


function Test() {
    const title = "申請リスト";
    const [requests, setRequests] = useState([]);
    let playList = [];
    const copyToClipboard = async (url, index) => {
        try {
            await navigator.clipboard.writeText(url);
            alert("URLがクリップボードにコピーされました！");

            // コピーが成功したら、リクエストのコピー状態を更新
            const updatedRequests = [...requests];
            updatedRequests[index] = { ...updatedRequests[index], copied: true };
            setRequests(updatedRequests);
        } catch (error) {
            console.error("Error copying to clipboard:", error);
        }
    };
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:5000/requests');
                const data = await response.json();
                const count = data.length;
                console.log(count);
                // 時間の降順でソート
                const sortedData = data.sort((a, b) => new Date(b.time) - new Date(a.time));
                // リクエストにチェック状態を追加
                // const requestsWithChecked = sortedData.map(request => ({ ...request, checked: false }));
                // setRequests(requestsWithChecked);
                // if (count > playList.length) {
                //     const diff = count - playList.length;
                //     const startIndex = playList.length + 1;
                //     const endIndex = count + 1;
                // }
                // 更新する必要がある場合のロジック
                if (count > playList.length) {
                    const newEntries = sortedData.slice(playList.length, count);
                    playList = [...playList, ...newEntries];
                }
                // playList.push(sortedData);
                console.log(playList);
                // // リクエストにチェック状態と再生状態を追加
                // const requestsWithAdditionalState = playList.map(request => ({
                //     ...request,
                //     isPlayed: false
                // }));
                // setRequests(requestsWithAdditionalState);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();

        // const interval = setInterval(fetchRequests, 5000); // 5秒ごとにデータを取得
        // return () => clearInterval(interval); // コンポーネントのクリーンアップ時にインターバルをクリア
    }, []);


    const handlePlayClick = (index) => {
        const updatedRequests = [...requests];
        updatedRequests[index].isPlayed = true;
        setRequests(updatedRequests);
    };

    // const handleCheckboxChange = (index) => {
    //     const updatedRequests = [...requests];
    //     updatedRequests[index].checked = !updatedRequests[index].checked;
    //     setRequests(updatedRequests);
    // };

    return (
        <div className="Test">
            <h1>{title}</h1>
            <ul>
                {playList.map((request, index) => (
                    <li key={index}>
                        <p>テーブル番号: {request.tableNumber}</p>
                        <p>動画のURL: {request.mp4URL}</p>
                        <p>時間: {new Date(request.time).toLocaleString()}</p>
                        <button onClick={() => copyToClipboard(request.mp4URL, index)}>
                            コピー
                        </button>
                        <button onClick={() => handlePlayClick(index)}>
                            {request.isPlayed ? '再生中' : '再生'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test;
