import styled from 'styled-components';

export const ProfilePicWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0 0 0;

    input[type='file']::-webkit-file-upload-button {
        visibility: hidden;
    }

    label {
        color: #1165ba;
        cursor: pointer;
    }

    label:hover {
        text-decoration: underline;
    }

    input[type="file" i] {
        display: none;
    }

    span {
        color: red;
        font-size: 0.8em;
        display: none;
    }
    & > p {
        color: #bababa;
        font-size: 0.7em;
    }
`;

export const Form = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 80%;
    margin: 0 auto;
    gap: 16px;

    .form__left {
        grid-column: 1 / 2;
        justify-self: end;
        margin-right: 50px;
    }

    .form__change {
        justify-self: end;
    }

    .form__right {
        grid-column: 2 / -1;
        margin-left: 50px;
    }

    .form__left,
    .form__right {
        max-width: 387px;
        text-align: left;
    }

    .form__divider {
        grid-column: 1 / -1;
    }

    .form__textarea {
        textarea {
            border: 1px solid #e8e8e8;
            border-radius: 6px;
            padding: 0.7rem 0 0 1rem;
            width: 100%;
            height: 250px;
            resize: none;
            border: 1px solid ${({ theme }) => theme.colors.mutedDark};

            ::placeholder {
                color: ${({ theme }) => theme.colors.mutedDarker};
            }
        }
    }
`;