import React, { useState, useEffect } from 'react';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import useStyles from './style';
import { CssBaseline, Box, Typography, Grid, Button, TextareaAutosize } from '@material-ui/core';
import image from '../../images/image.svg'
import upload from '../../images/upload.svg'
import addTshirt from '../../images/tshirt.svg'
import cropTop from '../../images/croptop.svg'
import kids from '../../images/kids.svg'
import { fabric } from 'fabric';
import "./MyLayerStyles.css";
import { Stage, Layer } from "react-konva";
import { CirclePicker } from "react-color";
import Konva from "konva";
import mockup2 from "../../images/new/tFnB.png";
import CropTop from "../Customize/Clothes/CropTop";
import Kids from "../Customize/Clothes/Kids";
import '../Admin/adminStyles.css';
import TextAddOn from "../Customize/Options/Text";
import { fetchColors } from '../../_actions/colorActions'
import { useDispatch, useSelector } from "react-redux";
import TextLayer from "../Customize/Layer/TextLayer";
import DesignNav from './Components/DesignNav';
import DesignBox from './Components/DesignBox';
import TShirt from '../Customize/Clothes/Tshirt';
import UploadComponent from './Options/UploadComponent';
import LogoLayer from './Layer/LogoLayer';
import axios from 'axios';
import Popup from "../../components/Reusable/Popup";
import sleeveDesign from "../../images/new/sleeveDesign.png";
import Notification from '../../components/Reusable/Notification';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import sizeTshirt from "../../images/sizeTshirt.jpg";
import sizeKids from "../../images/sizeKids.jpg";
import sizeCropTop from "../../images/sizeCropTop.jpg";


const Customize = () => {

  const classes = useStyles();
  const [toggleState, setToggleState] = useState(0);
  const [canvas, setCanvas] = useState('');
  const stageRef = React.useRef(null);
  const [color, setColor] = useState(["#ffffff"]);
  const [textOn, setTextOn] = useState(false);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('');
  const [textScale, setTextScale] = useState([]);
  const [clothing, setClothing] = useState('tshirt');
  const [textLayerColors, setTextLayerColors] = useState(["#ffffff", "#000000", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4",
    "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#C0C0C0", "#C9AE5D"]);
  const [circleSize, setCircleSize] = useState(35);
  const [sweater, setSweater] = useState(["#ffffff", "#000000", "#ffff00", "#ff69b4"]);
  const [selectedId, selectShape] = useState(null);
  const [selectedImageId, selectImage] = useState(null);
  const [images, setImage] = useState('');
  const [textEdited, setTextEdited] = useState(false);
  const [textPos, setTextPos] = useState({ x: 300, y: 300 });
  const [imageUrl, setImageUrl] = useState('');
  const [textTArray, setTextTArray] = useState([]);
  const [newText, setNewText] = useState('');
  const [index, setIndex] = useState(0);
  const [selectedShapeName, setSelectedShapeName] = useState('');
  const [pickerColorArray, setPickerColorArray] = useState([]);
  const [check, setCheck] = useState()
  const [imageSrcArray, setimageSrcArray] = useState([])
  const [imageSrc, setimageSrc] = useState()
  const [exportT, setexportT] = useState(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [openSleevePopup, setopenSleevePopup] = useState(false);
  const [openSizePopup, setopenSizePopup] = useState(false);
  const [customizeprice, setcustomizePrice] = useState(1100);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [notifySize, setNotifySize] = useState({ isOpen: false, message: '', type: '' });
  const [listOfSizes, setListOfSizes] = useState([]);
  const [size2, setSize] = useState('');
  const [specialNote,setSpecialNote] = useState('');
  

  useEffect(() => {
    setCanvas(initCanvas());
    setImage(getImage());
    axios.get("http://localhost:3001/invent/sizes").then((response) => {
            // console.log(response.data);
            setListOfSizes(response.data);
        });

  }, []);

  var price=1100;

  const Price = () => {
    
    if(imageSrcArray.length===1 && pickerColorArray.length === 1){
      price =2200
    }
    else if(imageSrcArray.length===1 && pickerColorArray.length > 1){
      price =1700
    }
    else if(imageSrcArray.length > 1 && pickerColorArray.length === 1){
      price = 1700
    }
    else if(pickerColorArray.length === 1){
      price = 1700
    }
    else if(pickerColorArray.length > 1){
      price = 1800
    }
    else if(imageSrcArray.length===1 && pickerColorArray.length === 1){
      price = 2200
    }
    else if(imageSrcArray.length === 1){
      price = 1900
    }
    else if(imageSrcArray.length > 1){
      price = 1900
    }
    else{
      price =1100
    }

  } 



  const dispatch = useDispatch();
  let history = useHistory();

  const pickedItemColors = useSelector((state) => state.colorReducer.pickerColor)

  const mColors = Object.values(pickedItemColors).map((key) => [pickedItemColors[0].color])

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var size = Object.size(pickedItemColors);

  const onsize = (e) => {
    setSize(e.target.value)
}

  var array = [];
  var i = 0;

  for (i = 0; i < size; i++) {

    array.push(pickedItemColors[i].color)
  }

  const [tshirt, setTshirt] = useState(array);

  useEffect(() => {
    dispatch(fetchColors());
  }, []);

  const setLogo = imgSrc => {
    setimageSrc(imgSrc)
  };

  const changeLogo = () => {
    setimageSrcArray([...imageSrcArray, imageSrc])
    console.log(imageSrcArray)
    Price();

  }

  const setCol = (e) => {
    setColor(e.target.value.rgb)
    console.log(e.target.value.rgb)
  }

  const handleCheck = (e) => {
    setCheck(e.target.value);
  }

  const addTextArray = (data, props) => {
    setTextTArray(data)
    console.log('add to desing')
    console.log(data)
    console.log('add to desing')
    console.log(textTArray)
    props.resetForm();
  }

  const getImage = () => {
    const MyImage = new window.Image()
    MyImage.src = mockup2;
    MyImage.onload = () => {
      setImage(MyImage)
    };
  }

  const onDragEnd = () => {
    setTextEdited(true)
    console.log('hello edited')
  };

  const onDragMove = (env) => {
    const txtPos = env.target._lastPos;
    console.log(txtPos)
    setTextPos(txtPos)
  };

  var changeTextColor = (e) => {
    setTextLayerColors(e.target.value)
  };

  //Handle text change as user input
  var handleTextChange = (e) => {
    console.log('hello text')
    console.log(e.target.value)
    setText(e.target.value)
  };

  //Check if adding text is on or off, when user turns it off
  //color goes back to default and so user doesn't see the $3 charge
  const handleTextChecked = (event) => {
    if (textOn) {
      console.log(event.target.name)
      setTextOn({ ...textOn, [event.target.name]: event.target.checked });
    } else {
      setTextOn({ ...textOn, [event.target.name]: event.target.checked });
    }
  };

  //Returns the type of clothing that user chooses
  const changeClothing = (clothes) => {
    if (clothes === "tshirt") {
      return <TShirt color={color} />;
    }
    else if (clothes === "cropTop") {
      return <CropTop color={color} />;

    }
    else {
      return <Kids color={color} />;
    }
  };

  //Handles change of clothing type and sets color to default
  var changeCloth = (e) => {
    const { value } = e.target;
    console.log(value)
    console.log(clothing)
    if (value !== clothing) {
      setClothing(value);
      setColor({ r: 255, g: 255, b: 255 });
    }
    console.log(clothing)
  };

  //When user clicks on logo or text, it will show the transformer
  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      selectShape(null);
      selectImage(null);
      return;
    }
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    if (name) {
      selectShape(name);
      selectImage(name);
    } else {
      selectShape(null);
      selectImage(null);
    }
  };

  //The text object gets transformed as user scale
  const handleTextTransform = (index, newProps) => {
    const textT = textScale.concat();
    console.log('hello texttrans');
    console.log(textScale[index]);
    textT[index] = {
      ...textT[index],
      ...newProps
    };
    setTextScale({
      textScale: textT
    });
  };

  const handleExportClick = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    downloadURI(uri, "tshirt.jpg");
    setexportT(uri);
    // handleSaveClick();
    console.log('hello')
    // console.log(exportT)
  }

  const handleChange = (e) => {
    const shape = e.target;
  };

  const changeText = (e) => {
    setNewText(e.target.value);
    console.log(e.target.value);
  };

  const uniqueSet = new Set(imageSrcArray);
  const backToArray = [...uniqueSet];

  const addText = () => {
    const newIndex = index + 1;
    setIndex(newIndex)
    console.log('hi frim thashhh')
    setPickerColorArray([...pickerColorArray, newText])
    console.log(pickerColorArray)
    Price();
  }

  const downloadURI = (uri, name) => {
    const link = window.document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 500,
      width: 500,
      //   backgroundColor:'pink'
    })
  )

  const addRect = canvi => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: 'yellow'
    });
    canvi.add(rect);
    canvi.renderAll();
  }

  const toggleTab = (index) => {
    setToggleState(index);
  };

  var userName = localStorage.getItem("fullname");
    console.log(userName)

    const setNote = (event) => {
      setSpecialNote(event.target.value)
  }

  const handleSaveClick = () => {
    console.log('hello')
    console.log(exportT)
    if(size2=='')
    {
      setNotify({
        isOpen: true,
        message: 'Select a Size !',
        type: 'error'
    });
    }
    else{
      setOpenPopup(false)
    var id = localStorage.getItem("userId");
    var fullname = localStorage.getItem("fullname");
    var userEmail = localStorage.getItem("userEmail");

    
    
    let orderNo =  'cust' + Math.round(  (Math.random() * Math.pow(10, 6)) + '' + new Date().getTime());
    let textCount = pickerColorArray.length
    let imageCount = imageSrcArray.length

    const data = {
      customerId: id,
      customerName: fullname,
      customerEmail: userEmail,
      orderNo: orderNo,
      userName:userName,
      image: exportT,
      price: price,
      textCount: textCount,
      imageCount: imageCount,
      size: size2,
      note:specialNote,
    }

    axios.post('http://localhost:3001/customizeOrders/upload/image', data).then((response) => {
      // alert('Image sent Successfull');
      setNotify({
        isOpen: true,
        message: 'Design Sent Successfully !',
        type: 'success'
    });

    history.push('/custcustomizeOrders')
    });

  }

  


  }

  return (

    <div>
      <CommonNav />
      <CssBaseline />
      
      <div className={classes.photoContainer} styles={{ marginTop: '200px' }}>
        
        <Grid md={3} className={classes.barContainer}>
          <Grid md={3}>
            <DesignNav
              toggleState={toggleState}
              toggleTab={toggleTab}
            />
          </Grid>
          

          <Grid item md={9} className={classes.bar2}>

            <div style={{    height: '320px'}}>

            <DesignBox
              toggleState={toggleState}
              toggleTab={toggleTab}
            />

            <Box className={toggleState === 1 ? classes.activeContent : classes.content}>
              <div className="text-container">
                <TextAddOn
                  textOn={textOn}
                  // handleTextChecked={handleTextChecked}
                  handleTextChange={handleTextChange}
                  changeTextColor={changeTextColor}
                  textLayerColors={textLayerColors}
                  changeText={changeText}
                  addText={addText}
                />
                <CirclePicker
                  border="black" borderColor='black' stroke="black" width="max-width"
                  colors={textLayerColors}
                  onChange={textLColors => {
                    setTextColor(textLColors.hex);
                  }}
                />
              </div>
            </Box>
            <Box className={toggleState === 3 ? classes.activeContent : classes.content}>
              <Grid Container className={classes.bar3} >
                <UploadComponent
                  setLogo={setLogo}
                  changeLogo={changeLogo}
                />
              </Grid>
            </Box>
            <Box className={toggleState === 4 ? classes.activeContent : classes.content}>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a>
                    <button className={classes.barBtn2} onClick={(e) => changeCloth({ target: { value: 'tshirt' } })} value="tshirt">
                      <img height={50} src={addTshirt} />
                      <Typography textDecoration='none' className={classes.barFont}>T SHIRT</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a>
                    <button className={classes.barBtn2} onClick={(e) => changeCloth({ target: { value: 'cropTop' } })} value="cropTop" className={classes.barBtn2}>
                      <img height={50} src={cropTop} />
                      <Typography textDecoration='none' className={classes.barFont}>CROP TOP</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a>
                    <button className={classes.barBtn2} onClick={(e) => changeCloth({ target: { value: 'kids' } })} value="kids">
                      <img height={50} src={kids} />
                      <Typography textDecoration='none' className={classes.barFont}>KIDS</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
            <Box className={toggleState === 5 ? classes.activeContent : classes.content}>
              <Grid Container className={classes.bar3} >
                <div className="color-picker">
                  <CirclePicker
                    id="circle-picker"
                    display='flex'
                    circleSize={circleSize}
                    colors={array}
                    onChange={color => {
                      setColor(color.rgb);
                      console.log(color)
                    }}
                  />
                </div>
              </Grid>
            </Box>
            <Box className={toggleState === 6 ? classes.activeContent : classes.content}>
              <Grid Container className={classes.bar3} >
                <div className="color-picker">
                <TextareaAutosize aria-label="minimum height" placeholder="Add Note" onChange={setNote} style={{ width: '400px', height: '200px', textAlign: 'justify', padding: '15px', fontFamily: 'Montserrat', marginTop: '30px', borderRadius: '5px' }} />
                </div>
              </Grid>
            </Box>
            <Box className={classes.content}>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={text} />
                      <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={image} />
                      <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.content}>
              <Grid Container className={classes.bar3} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={upload} />
                      <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={tshirt} />
                      <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
            
            </div>
            <div className={classes.customizePrice}>
              <div style={{display:'none'}}>{imageSrcArray.length===1 && pickerColorArray.length === 1 ?  price=2200 : imageSrcArray.length===1 && pickerColorArray.length > 1 ? price=2400 :imageSrcArray.length > 1 && pickerColorArray.length === 1 ? price=2300: pickerColorArray.length === 1 ? price=1700 : pickerColorArray.length > 1 ? price=1800 :imageSrcArray.length===1 && pickerColorArray.length === 1 ? price=2200 : imageSrcArray.length === 1 ?  price=1900 : imageSrcArray.length > 1 ?  price=2100 : price=1100}</div>              
              <div >Approximate Price</div>
              <div >LKR {price}.00</div>                
              </div>
              
          </Grid>
          
        </Grid>
        
        
        <Grid md={7} className={classes.tshirtDiv}>
          <div className="clothes" style={{ backgroundColor: color, width: '900px' }}>
            <Stage width={850} height={500}
              onMouseDown={handleStageMouseDown}
              ref={stageRef}
            >
              <Layer>{changeClothing(clothing)}</Layer>
              <Layer>
                {pickerColorArray.map((value, index) => {
                  console.log(pickerColorArray[index - 1])
                  console.log('index')
                  console.log(index)
                  return (
                    <TextLayer
                      value={value}
                      textColor={textColor}
                      key={index}
                      isSelected={index === selectedId}
                      shapeProps={value}
                      onSelect={() => {
                        selectShape(index);
                      }}
                      onChange={(newAttrs) => {
                        const rects = pickerColorArray.slice();
                        rects[index] = newAttrs;
                        console.log('hi bye')
                        console.log(rects)
                        console.log('hi bye')
                      }}
                      selectedShapeName={selectedShapeName}
                      onDelete={() => {
                        const newString = [...pickerColorArray];
                        newString.splice(index, 1);
                        setPickerColorArray(newString);
                      }}
                    />
                  );
                })}
              </Layer>
              <Layer>
                {imageSrcArray.map((image1, i) => {
                  console.log('index')
                  console.log(i)
                  return (
                    <LogoLayer
                      image1={image1}
                      shapeProps={image1}
                      key={i}
                      isImageSelected={i === selectedImageId}
                      onSelect={() => {
                        selectImage(i);
                        console.log('selectedImageId')
                        console.log(selectedImageId)
                      }}

                      onChange={(newAttrs) => {
                        const newImage = imageSrcArray.slice();
                        newImage[i] = newAttrs;
                      }}
                      onDelete={() => {
                        const newString = [...imageSrcArray];
                        newString.splice(index, 1);
                        setimageSrcArray(newString);
                      }}

                    />
                  );

                })}

              </Layer>
            </Stage>
          </div>
          <center>
            <Button className={classes.download}
              onClick={() => {
                handleExportClick()
                setOpenPopup(true);
              }}
            >SAVE AND GET THE ACCEPTANCE</Button>

          </center>
        </Grid>
        <Popup
          title="Approximate Price for your Design"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <center>
          <Grid >
            <Box style={{textAlign:'center', padding: '10px', fontSize:'16px'}}>Your approximate price is LKR {price}.00</Box>
            <Box style={{textAlign:'center', padding: '10px', fontSize:'14px'}}>The real price of the design could be change with the admin acceptance</Box>

          </Grid>
          <Grid item xs={6}>
                    <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                    <select className={classes.icon} name="Select"  onChange={onsize}>
                                    <option value="">SELECT SIZE</option>
                                   
                                    {listOfSizes
                                            .map((value) => {
                                                return (

                                                    <option value={value.size}>{value.size}</option>
                                                    );
                                                })}

                                </select>
                                </ButtonGroup>
                   
                    </Grid>
          <Grid item md={12} >
            <Button
              className={classes.slevebtn}
              onClick={() => {
                handleSaveClick()
                
              }}
            >GET THE REAL PRICE</Button>
          </Grid>
          </center>
        </Popup>
        <Grid md={1} >
          <Grid item md={2.4} style={{ width: '100%' }}>
            <a href="#">
              <button className={classes.barBtn2} onClick={(e) => changeCloth({ target: { value: 'tshirt' } })} value="tshirt">
                <img height={50} src={addTshirt} />
                <Typography textDecoration='none' className={classes.barFont}>T SHIRT</Typography>
              </button>
            </a>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4} >
            <a href="#">
              <button className={classes.barBtn2} onClick={(e) => changeCloth({ target: { value: 'cropTop' } })} value="cropTop" className={classes.barBtn2}>
                <img height={50} src={cropTop} />
                <Typography textDecoration='none' className={classes.barFont}>CROP TOP</Typography>
              </button>
            </a>
          </Grid>
          <Grid item md={2.4} style={{ width: '100%' }}>
            <a href="#">
              <button className={classes.barBtn2} onClick={(e) => changeCloth({ target: { value: 'kids' } })} value="kids">
                <img height={50} src={kids} />
                <Typography textDecoration='none' className={classes.barFont}>KIDS</Typography>
              </button>
            </a>
          </Grid>
          <Grid>
            <Button
              className={classes.slevebtn}
              onClick={() => {
                setopenSleevePopup(true);
              }}
            >SLEAVE DESIGNING</Button>
          </Grid>
          <Grid>
            <Button
              className={classes.slevebtn}
              onClick={() => {
                setopenSizePopup(true);
              }}
            >SIZE GUIDE</Button>
          </Grid>

          <Popup
            title="Special Design Areas"
            openPopup={openSleevePopup}
            setOpenPopup={setopenSleevePopup}
          >
            <center>
            <Grid style={{ alignItems: 'center' }}>
              <Typography style={{ textAlign: 'center' }}>More design areas to make you stand out</Typography>
              <Typography style={{ textAlign: 'center' }}>Give us a call to add to your design, get a quote, and place your order.</Typography>
              <Button
              className={classes.slevebtn}
              onClick={() => {
                history.push('/contactus')
              }}
            >CONTACT US</Button>
              <center>
                <img style={{ alignItems: 'center' }} src={sleeveDesign} style={{ height: '300px' }} />
              </center>


            </Grid>
            </center>
          </Popup>

          <Popup
            title="Size Guide"
            openPopup={openSizePopup}
            setOpenPopup={setopenSizePopup}
          >
            <center>
            <Grid style={{ alignItems: 'center', display:'flex' }}>
            <img src={sizeTshirt} style={{ width: '30%', padding:'10px' }} />
            <img src={sizeCropTop} style={{ width: '30%', padding:'10px' }} /> 
            <img src={sizeKids} style={{ width: '30%', padding:'10px' }} />


            </Grid>
            </center>
          </Popup>

        </Grid>
        <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <Notification
                    notify={notifySize}
                    setNotify={setNotifySize}
                />
      </div>

      <Footer />
    </div>

  );
}

export default Customize;