import React, {
	Dispatch,
	FC,
	useState,
	SetStateAction,
} from 'react';
import styles from '../styles/Upload.module.scss';
import { FileUploader } from 'react-drag-drop-files';
import { uploadBytes } from 'firebase/storage';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';


interface UploadProps {
	setUpload: Dispatch<SetStateAction<boolean>>;
	firebase: any;
}

const Upload: FC<UploadProps> = ({ setUpload, firebase }) => {
	const [file, setFile] = useState<any>(null);
	const [dropped, setDropped] = useState<boolean>(false);

	const ClosePopUp = (event: any) => {
		event.preventDefault();
		if (event.target === event.currentTarget) {
			setUpload(false);
		}
	};

	return (
		<div onClick={ClosePopUp} className={styles.Upload}>
			<main className={styles.main}>
				<h1>Upload Image</h1>
				{dropped ? (
					<UploadImage firebase={firebase} file={file} />
				) : (
					<DragDrop setFile={setFile} setDropped={setDropped} />
				)}
			</main>
		</div>
	);
};

interface UploadImage {
	file: any;
	firebase: any;
}

const UploadImage: FC<UploadImage> = ({ file, firebase }) => {
	const loginInfo = useSelector((state: any) => state.login);
	const storage = getStorage(firebase);
	const db = getFirestore(firebase);
    const today = new Date().toLocaleDateString();
    const [description, setDescription] = useState<String>('')
    const [uploading, setUploading] = useState<boolean>(false)

	const UploadStorage = async() => {
		const id = uuidv4();
		const storageRef = ref(storage, id);

		await uploadBytes(storageRef, file).then((snapshot) => {
			console.log('Uploaded a blob or file!');
		});
		
		const ImageURL = await getDownloadURL(storageRef).then((link) => {
			return link;
		});

		try {
			const docRef = await addDoc(collection(db, 'Posts'), {
				ImageId: id,
				ImageURL: ImageURL,
				user: loginInfo.Name,
                pic: loginInfo.ProfilePic,
                email: loginInfo.Email,
				date: today,
                description: description,
                likes: 0,
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
        alert("Image Uploaded!!!")
        window.location.reload();
	};

	return (
		<div className={styles.UploadImage}>
			<img src={URL.createObjectURL(file)} />
			<div className={styles.description}>
				<h3>Description: </h3>
				<input maxLength={50} onChange={(e) => {setDescription(e.target.value)}} name="description" />
			</div>
            {uploading ? 
			<button className={styles.Uploading}>
				Uploading
			</button>
            : 
			<button onClick={() => {UploadStorage(); setUploading(true)}} className={styles.Upload}>
				Upload
			</button>
            
            }
		</div>
	);
};

interface DragDropProps {
	setDropped: Dispatch<SetStateAction<boolean>>;
	setFile: Dispatch<SetStateAction<boolean>>;
}

const DragDrop: FC<DragDropProps> = ({ setDropped, setFile }) => {
	const fileTypes = ['JPG', 'PNG', 'GIF'];

	const handleChange = (file: any) => {
		setFile(file);
		setDropped(true);
	};

	return (
		<div className={styles.DropSection}>
			<FileUploader handleChange={handleChange} types={fileTypes}>
				<img src="/Drop.png" />
			</FileUploader>
			<h2>👈 Drag and Drop</h2>
		</div>
	);
};

export default Upload;
