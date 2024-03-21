import { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Slider from "@mui/material/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import handleUploadImage from "../../../api/handleUploadImage";
import updateShowBotomToast from "../../../redux/Auth/Actions/showBottomToast";
import updateUserDetails from "../../../redux/Auth/Actions/userDetails";

const EasyCrop = (props) => {
    const { image, setDrawerOpen } = props;
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const userDetails = useSelector(state => state.Auth.userDetails)

    const dispatch = useDispatch();

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImageResult = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
            );
            if (croppedImageResult) {
                setCroppedImage(croppedImageResult);
            } else {
                console.error('getCroppedImg returned undefined');
            }
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation, image]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);

    const onSubmit = async () => {
        try {
            if (!croppedImage) {
                dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Updated Image is undefined' }));
                return;
            }

            setDrawerOpen({ 'bottom': false });

            // Convert the base64 data of the cropped image to a Blob
            const blob = await fetch(croppedImage).then((res) => res.blob());

            // Create a File object with a specific filename and type
            const file = new File([blob], `${userDetails.username}.jpg`, { type: blob.type });

            dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Updating profile photo' }))

            const response = await handleUploadImage(file);
            if (!response.success) {
                dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Error updating profile photo' }));
            }
            else {
                dispatch(updateUserDetails(response.user));
                dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Profile photo updated successfully!' }));
            }
        } catch (error) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Error updating profile photo' }));
        }
    };



    return (
        <div>
            <button
                style={{
                    display: image === null || croppedImage !== null ? "none" : "block",
                }}
                onClick={showCroppedImage}
                className="absolute bottom-2 right-2 z-50 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            >
                Save Changes
            </button>
            <div
                className="container"
                style={{
                    display: image === null || croppedImage !== null ? "none" : "block",
                }}
            >
                <div className="crop-container">
                    <Cropper
                        image={image}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        zoomSpeed={4}
                        maxZoom={3}
                        zoomWithScroll={true}
                        showGrid={true}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                    />
                </div>
                <div className="absolute right-6 top-1">
                    <label>
                        Rotate
                        <Slider
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="rotate"
                            onChange={(e, rotation) => setRotation(rotation)}
                            className="range"
                        />
                    </label>
                    <label>
                        Zoom
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="zoom"
                            onChange={(e, zoom) => setZoom(zoom)}
                            className="range"
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-center items-center">
                {croppedImage && (
                    <img className="cropped-image w-60 h-60" src={croppedImage} alt="cropped" />
                )}
                {croppedImage &&
                    <>
                        <button onClick={onClose} className="absolute top-2 right-2 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                            Update
                        </button>
                        <button onClick={onSubmit} className="absolute bottom-2 right-2 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                            Upload
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default EasyCrop;