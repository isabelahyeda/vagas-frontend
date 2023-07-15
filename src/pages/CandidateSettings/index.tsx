import profilePicture from '../../assets/imgs/profile-image.svg';
import trashPicture from '../../assets/imgs/trash.svg';
import {
    Container,
    Form,
    ProfilePicWrapper,
    Title,
    CurriculoWrapper,
    Trash,
    ExtraLine,
    Required,
    Buttons,
    ErrorMessages,
    Spacing,
} from './style';
import {
    Position,
    Main,
    Row,
} from '../styles/CandidatePortalStyles';
import InputWrapper from '../../components/InputWrapper';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import Footer from '../../components/Portal/Footer';
import location from '../ProfileSettings/data/location';
import Header from '../../components/Portal/Header';
import { ProfileImg } from '../../components/Portal/Header/styles';
import { HandleInputsRenderCandidate } from './utils/handleInputsRenderCandidate';
import inputConfigCandidate from './data/inputConfigCandidate';
import { useState, useContext } from 'react';
import ConfirmModal from '../../components/Portal/ProfileModal/ConfirmModal';
import CancelModal from '../../components/Portal/ProfileModal/CancelModal';
import { handleImgFile } from '../ProfileSettings/utils/handleImgFile';
//import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CandidateUpdateFormSchema } from '../../validations/CandidateUpdateFormValidation';


export const CandidateSettings: React.FC = () => {

    const HandleOptionsRender = (arr: any): [] => {
        return arr.map((element: any) => {
            const key = element.id;
            return (
                <option key={key} value={element.sigla}>
                    {element.nome}
                </option>
            );
        });
    };
    const [deleteButton1, setDeleteButton1] = useState(false);
    const [deleteButton2, setDeleteButton2] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null | any>(null);
    const [imagePreview, setImagePreview] = useState<Blob | null>(null);
    const [file1, setFile1] = useState<File | any>();
    const [file2, setFile2] = useState<File | any>();

    const {
        register,
        handleSubmit,
        resetField,
        clearErrors,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(CandidateUpdateFormSchema)
    });

    //const api = useApi();
    const auth = useContext(AuthContext);

    // Funções do delete button

    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj1 = e.target.files && e.target.files[0];
        console.log(fileObj1)
        setFile1(fileObj1);

        if (!fileObj1) {
            setValue("inputFile1", false)
            return;
        }
        setDeleteButton1(true);
        setValue("inputFile1", true);
        clearErrors("fileInput1");
    };

    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj2 = e.target.files && e.target.files[0];
        setFile2(fileObj2);

        if (!fileObj2) {
            return;
        }
        setDeleteButton2(true);
    };

    const resetFileInput1 = () => {
        if (file1) {
            resetField("fileInput1")
        }
        setDeleteButton1(false);
        setFile1(false)
    };
    const resetFileInput2 = () => {
        if (file2) {
            resetField("fileInput2")
        }
        setDeleteButton2(false);
        setFile2(false)
    };

    // Função do modal de cancelamento

    const handleCancelModal = (e: any) => {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        setCancelModal(true);
        window.scrollTo(0, 0);
    };

    const onSubmit = (e: any) => {
        console.log(e)
    };

    return (
        <Container>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ProfilePicWrapper>
                    <ProfileImg
                        src={
                            imagePreview ||
                            (auth.user.profile ?? profilePicture)
                        }
                        alt="Foto de perfil"
                        width={'10%'}
                    />
                    <div className="upload">
                        <label htmlFor="profiPic">Alterar foto</label>
                        <input
                            name="profPic"
                            id="profiPic"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e: any) =>
                                handleImgFile({
                                    e,
                                    setSelectedImage,
                                    setImagePreview,
                                })
                            }
                        />
                    </div>
                    <p>Somente formatos jpg, jpeg e png</p>
                    <span>Tamanho ou formato inválido</span>
                </ProfilePicWrapper>
                <Main>
                    <Row />
                </Main>
                <Title>Dados Pessoais</Title>
                <Form>
                    <div className="form__left">
                        <InputWrapper>
                            {HandleInputsRenderCandidate(inputConfigCandidate, register, errors)}
                            <label>
                                Telefone 1<Required>*</Required>
                                <input
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                    maxLength={11}
                                    {...register("phoneNumber1")}
                                />
                            </label>
                            <ErrorMessages>
                                {errors.phoneNumber1 && <>{errors.phoneNumber1.message}</>}
                            </ErrorMessages>
                        </InputWrapper>
                    </div>
                    <div className="form__right">
                        <InputWrapper>
                            <label>
                                Cidade<Required>*</Required>
                                <input
                                    {...register("city")}
                                    type="text"
                                    placeholder="Insira sua cidade"
                                />
                            </label>
                            <ErrorMessages>
                                {errors.city && <>{errors.city.message}</>}
                            </ErrorMessages>
                            <Spacing />
                        </InputWrapper>
                        <Select>
                            <label htmlFor="states">
                                UF<Required>*</Required>
                            </label>
                            <select id="states"  {...register("uf")}>
                                <option value="DEFAULT">--</option>
                                {HandleOptionsRender(location)}
                            </select>
                        </Select>
                        <ErrorMessages>
                            {errors.uf && <>{errors.uf.message}</>}
                        </ErrorMessages>
                        <Spacing />
                        <InputWrapper>
                            <label>
                                Telefone 2
                                <input
                                    maxLength={11}
                                    type="tel"
                                    name="phoneNumber2"
                                    placeholder="(00) 00000-0000"
                                />
                            </label>
                        </InputWrapper>
                    </div>
                </Form>
                <Main>
                    <Row />
                </Main>
                <Title>Dados Profissionais</Title>
                <Form>
                    <div className="form__left">
                        <CurriculoWrapper>
                            <span>Currículo 1 <Required>*</Required></span>
                            <div>
                                {file1 ? (
                                    <label htmlFor="fileInput1">
                                        {file1.name}
                                    </label>) :
                                    (<label htmlFor="fileInput1">
                                        Insira seu currículo em PDF
                                    </label>)
                                }
                                {deleteButton1 && (
                                    <Trash onClick={resetFileInput1}>
                                        <img src={trashPicture} alt="Deletar arquivo" />
                                    </Trash>
                                )}
                            </div>
                            {
                                <ErrorMessages>
                                    {errors.fileInput1 && <>{errors.fileInput1.message}</>}
                                </ErrorMessages>
                            }
                            <input
                                //name="fileInput1
                                type="file"
                                id="fileInput1"
                                accept=".pdf"
                                //{...register("fileInput1")}
                                {...register("fileInput1", { required: "Currículo obrigatório" })}
                                onChange={(e) => {
                                    const { onChange } = register("fileInput1");
                                    onChange(e);
                                    handleFileChange1(e);
                                }}
                            />
                        </CurriculoWrapper>
                    </div>
                    <div className="form__right">
                        <CurriculoWrapper>
                            <span>Currículo 2</span>
                            <div>
                                {
                                    file2 ? (
                                        <label htmlFor="fileInput2">
                                            {file2.name}
                                        </label>) :
                                        (<label htmlFor="fileInput2">
                                            Insira seu currículo em PDF
                                        </label>)
                                }
                                {deleteButton2 && (
                                    <Trash onClick={resetFileInput2}>
                                        <img src={trashPicture} alt="Deletar arquivo" />
                                    </Trash>
                                )}
                            </div>
                            <input
                                {...register("fileInput2")}
                                onChange={handleFileChange2}
                                type="file"
                                id="fileInput2"
                                accept=".pdf"
                            />
                        </CurriculoWrapper>
                    </div>
                </Form>
                <ExtraLine>
                    <Row />
                </ExtraLine>
                <Buttons>
                    <div>
                        <Button
                            type="submit"
                        >
                            Atualizar
                        </Button>
                    </div>
                    <div>
                        <Button background="outline" onClick={handleCancelModal}>
                            Cancelar
                        </Button>
                    </div>
                </Buttons>
            </form>
            {confirmModal && <ConfirmModal setConfirmModal={setConfirmModal} />}

            {cancelModal && <CancelModal setCancelModal={setCancelModal} />}
            <Position>
                <Main>
                    <Row />
                </Main>
                <Footer />
                <Main>
                    <Row />
                </Main>
            </Position>
        </Container>
    );
};

