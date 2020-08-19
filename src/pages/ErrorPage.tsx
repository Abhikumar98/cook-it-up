import React from "react";
import styled from "styled-components";
import error from "../Assests/error1.png";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    .image-container {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        .error {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 24px;
            .heading {
                font-weight: 900;
                font-size: 3rem;
            }
            .error-message {
                color: red;
                font-weight: 900;
            }
            .hover {
                margin: auto;
                &:hover {
                    color: dodgerblue;
                    cursor: pointer;
                }
            }
        }
        img {
            height: 100px;
        }
    }
`;

const ErrorPage = () => {
    const history = useHistory();
    const handleGoBack = () => {
        history.goBack();
    };

    const errorMessage =
        (history.location.state as any) &&
        (history.location.state as any).error &&
        (history.location.state as any).error.response &&
        (history.location.state as any).error.response.data &&
        (history.location.state as any).error.response.data.message
            ? (history.location.state as any).error.data.message
            : null;

    return (
        <Container>
            <div className="image-container">
                <div className="error">
                    <div className="heading">Oops, something went wrong.</div>
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    <span onClick={handleGoBack} className="hover">
                        Please try again
                    </span>
                </div>
                <img src={error} alt="Error" />
            </div>
        </Container>
    );
};

export default ErrorPage;
