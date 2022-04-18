import { Fragment, useState, useEffect } from "react";
import { Image } from 'cloudinary-react';
import API from "../../utils/API";
import DeletePhoto from "../IconDeletePhoto";
import SearchImage from "../IconSearchImage";
import IconImageUpload from "../IconImageUpload";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

const FileUpload = () =>
{
  // Set states for component
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [uploadedFile, setUploadedFile] = useState("");
  const [childrenHelp, setChildrenHelp] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  // const [filePaths, setFilesPaths] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [publicIds, setPublicIds] = useState("");
  const [imageToDeleteId, setImageToDeleteId] = useState("");

  // Function to retrieve the last image uploaded
  async function loadImage()
  {
    // await API.getHomeImages()
    await API.getUploadedImages()
      .then((res) =>
      {
        console.log(res.data);
        const images = res.data.map((item) =>
        {
          return {
            // fileName: item.fileName,
            // filePath: item.filePath,
            // id: item._id,
            public_id: item
          };
        })
        console.log(images)
        setUploadedFile(images[images.length - 1].public_id);
        // setUploadedFile(image[image.length - 1].filePath);
        // setUploadedFileId(image[image.length - 1].id);
      })
      .catch((err) => console.log(err));
  }

  // Render the component again when last image has been retrieved
  useEffect(() =>
  {
    loadImage();
  }, [imageToDeleteId]);

  // Function to display the selected file name
  const onChange = (e) =>
  {
    setChildrenHelp("");
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log("e.target.files: ", e.target.files)
  };

  // Function to submit and display the file that was selected
  const onSubmit = async (e) =>
  {
    if (fileName !== "No file chosen")
    {
      setFileName("No file chosen");
      setFile("");
      setShowUploadForm(false);
      e.preventDefault();

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (e)
      {
        API.uploadImage({ file: reader.result })
          .then(response =>
          {
            console.log("response ", response);
            setUploadedFile(response.data.public_id);
            // const ImageToAdd = {
            //   fileName: file.name,
            //   filePath: response.data.secure_url
            // }
            // API.saveHomeImg(ImageToAdd);
          });
      }

      // UNSIGNED CLOUDINARY UPLOAD
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("upload_preset", "e0q1bp0i");
      // Axios.post("https://api.cloudinary.com/v1_1/dmrpspydu/image/upload",
      //   formData
      // )
      // setUploadedFile(`https://res.cloudinary.com/dmrpspydu/image/upload/v1649157923/${response.data.public_id}`);
      // const ImageToAdd = {
      //   fileName: file.name,
      //   filePath: `https://res.cloudinary.com/dmrpspydu/image/upload/v1649157923/${response.data.public_id}`,
      // };

    }
    else
    {
      setChildrenHelp("Choose a file");
    }
  }

  // Function to remove the file from the DB
  // and to display the previous image uploaded
  const removeImage = async (e) =>
  {
    // await API.deleteHomeImg(uploadedFileId);
    e.preventDefault();
    setImageToDeleteId(e.target.id);
    await API.deleteUploadedImage(e.target.id);
  }

  // Function to display the Upload Form
  const uploadImage = (e) =>
  {
    setShowUploadForm(prevShowUploadForm => !prevShowUploadForm);
  }

  // Function to close the Modal
  const closeModal = () =>
  {
    setShowModal(prevShowModal => !prevShowModal);
  }

  //  Function to retrieve all the images
  const loadImages = async (e) =>
  {
    setShowModal(prevShowModal => !prevShowModal);
    // await API.getHomeImages()
    await API.getUploadedImages()
      .then((res) =>
      {
        const images = res.data;
        // const images = res.data.map((item) =>
        // {
        //   return {
        //     fileName: item.fileName,
        //     filePath: item.filePath,
        //     id: item._id,
        //   };
        // });
        // setFilesPaths(images);
        // console.log(filePaths);

        setPublicIds(images);
      })
      .catch((err) => console.log(err));
  }

  // FIND A WAY TO DISPLAY THE IMAGE
  const changeImage = (e) => {
    e.preventDefault();
    setUploadedFile(e.target.id);
  }

  // Function to show the upload image form
  const ShowUploadImage = () =>
  {
    return (
      <form className="mt-4" style={{ margin: "auto" }}>
        <div
          className="file is-normal is-boxed has-name"
          style={{
            justifyContent: "center",
          }}
        >
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="customFile"
              id="customFile"
              onChange={onChange}
            />
            <span className="file-cta">
              <span className="file-label">Choose a file</span>
            </span>
            <span className="file-name">{fileName}</span>
          </label>
        </div>
        <input
          type="submit"
          value="upload"
          className={fileName !== "No file chosen" ? "btn btn-primary btn-block mt-4 button uploadBtn" : "btn btn-primary btn-block mt-4 button"}
          onClick={onSubmit}
        />
        <p className="help mt-4">{childrenHelp}</p>
      </form>
    )
  }

  return (
    <Fragment>
      {uploadedFile ? (
        <Image
          className="mt-6"
          width="80%"
          cloudName="dmrpspydu"
          style={{ borderRadius: "20px" }}
          publicId={uploadedFile} />
      ) : null}
      <div>
        <button
          className="imagesBtn"
          onClick={uploadImage}
        >
          <IconImageUpload />
        </button>
        <button
          className="imagesBtn"
          onClick={removeImage}
        >
          <DeletePhoto id={uploadedFile} />
        </button>
        <button
          className="imagesBtn"
          onClick={loadImages}
        >
          <SearchImage />
        </button>
      </div>
      {showUploadForm === true ? (
        <ShowUploadImage />
      ) : null}
      {/* {filePaths ? */}
      {publicIds ?
        <Modal
          style={{ zIndex: "1200" }}
          show={showModal}
          close={closeModal}
          children={publicIds.map((item, index) =>
          {
            return (
              <div key={index}>
                <button id={item} onClick={changeImage} className="modalImageBtn">
                  <Image
                    className="modalImage"
                    key={index}
                    cloudName="dmrpspydu"
                    publicId={item}
                    width="100px"
                    style={{ margin: "10px" }}
                  />
                </button>
              </div>
            )
          })}
        // children=
        // {filePaths.map(item =>
        // {
        //   return <img src={item.filePath} alt={item.fileName} key={item.id} style={{
        //     margin: "10px", height: "80px"
        //   }}
        // />
        // })
        // }
        />
        : null
      }
    </Fragment>
  )
};

export default FileUpload;
