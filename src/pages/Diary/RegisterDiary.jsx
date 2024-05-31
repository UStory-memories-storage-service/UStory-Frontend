import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './RegisterDiary.module.scss';
import SubHeader from '@/components/SubHeader/SubHeader';
import InputField from '@/components/InputField/InputField';
import DiaryImageUpload from '@/components/DiaryImageUpload/DiaryImageUpload';
import SelectBox from '@/components/SelectBox/SelectBox';
import ArrowIcon from '@/assets/icons/ArrowIcon'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal';

const RegisterDiary = () => {

    const [selectedColor, setSelectedColor] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const categories = [  
        { label: "개인", value: "개인" },
        { label: "연인", value: "연인" },
        { label: "가족", value: "가족" },
        { label: "친구", value: "친구" },
        { label: "기타", value: "기타" }
    ];
    const markerColors = ["#FBB9C5", "#FDD0B1", "#FBB9C5", "#FDD0B1", "#FBB9C5", "#FDD0B1", "#F9EFC7",  "#FBB9C5", "#FDD0B1", "#F9EFC7"];
    const memebers = ["마자용", "그래용"];


    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };


    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <SubHeader pageTitle="다이어리 만들기" />
            <div className={styles.formContainer}>
                <InputField
                    label="다이어리 이름"
                    placeholder="다이어리 이름을 입력해주세요."
                    className={styles.input}
                />
                <DiaryImageUpload />
                <SelectBox options={categories} value={categories.label} label="친구 선택" />
                <div className={styles.markerColorSelect}>
                    <p>마커 색상</p>
                    <p className={styles.information}>선택한 색상으로 지도에 마커가 생성됩니다.</p>
                    <div className={styles.colorButtons}>
                        {markerColors.map((color, index) => (
                            <button
                                key={index}
                                className={selectedColor === color ? styles.selected : ''}
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                            ></button>
                        ))}
                    </div>
                </div>
                <div className={styles.membersSelect}>
                    <div className={styles.title}>
                        <div className={styles.phrases}>
                            <p>멤버 </p>
                            <p className={styles.information}>최대 10명까지</p>
                        </div>
                        <Link to="/memberselect">
                            <ArrowIcon fill="#000" />
                        </Link>
                    </div>
                    <div className={styles.selectedMembers}>
                        {memebers.map((member, index) => (
                            <div
                                key={index}
                                className={styles.selectedMember}
                            >{member}</div>
                        ))}    
                    </div>
                </div>
                <div className={styles.diaryIntroduction}>
                    <p>소개</p>
                    <textarea id='diaryIntroduction' placeholder='다이어리에 대해 소개해주세요.'></textarea>
                </div>
                <Button label="기록하기" variant="active" onClick={handleButtonClick} />
                {isModalOpen && (
                    <Modal closeFn={closeModal}>
                        <Modal.Icon>
                            <img src="/src/assets/images/completedImage.png" alt="완료" />
                        </Modal.Icon> 
                        <Modal.Body>
                            <p>다이어리 추가가 완료되었습니다.</p>
                        </Modal.Body>
                        <Modal.Button>
                            <Button type="button" label="확인" variant="active" onClick={() => navigate('/diary')} />
                        </Modal.Button>
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default RegisterDiary;