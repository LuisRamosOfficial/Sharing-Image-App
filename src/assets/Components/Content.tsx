import React, { FC, useEffect, useState } from 'react';
import styles from '../styles/Content.module.scss';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

interface Props {
	firebase: any;
}

const Content: FC<Props> = ({ firebase }) => {
	const db = getFirestore(firebase);
	const storage = getStorage(firebase);
	const [posts, setPosts] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			let data: Array<any> = [];
			const querySnapshot = await getDocs(collection(db, 'Posts'));
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setPosts(data);
			setLoading(false);
		};
		fetchData();
	}, []);

	return (
		<main className={styles.Content}>
			{loading ? (
				<h1>LOADING POSTS...</h1>
			) : (
				<Posts storage={storage} posts={posts} />
			)}
		</main>
	);
};

const Posts: FC<any> = ({ posts, storage }) => {
	console.log(posts)
 

	return (
		<>
			<h2>Posts:</h2>
			<div className={styles.PostList}>
				{posts.map((post: any) => (
					<div key={post.Image} className={styles.post}>
						<div className={styles.TitleDate}>
							<span>
                <img className={styles.profilepic} src={post.pic}/>
								<p>{post.user}</p>
							</span>
							<p>{post.date}</p>
						</div>
						<img className={styles.imgpost} src={post.ImageURL} />
            <p className={styles.description}>{post.description}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default Content;
