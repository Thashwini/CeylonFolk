import { makeStyles } from '@material-ui/styles';
import cfCover from '../../images/cfCover.png';
import mockup from '../../images/mockup.png';
// import mockup from '../../images/tttmockup.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '1000px',
        fontFamily: 'Montserrat',
        position: 'relative',
        color: 'white',
        padding: '100px',
        background:'red'
    },
    photoContainer:{
        // backgroundImage:`url(${cfCover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: '80px',
        padding:'20px',
        display:'flex',
        justifyContent: 'space-between'
    },
    bar:{
        background:'black',
        padding:'10px',
        marginLeft:'5px',
        justifyContent:'space-between'

    },
    bar2:{
        background:'#e5f3f8',
        padding:'10px',
        justifyContent:'space-between',
        alignItems:'center',
        height: '420px'
    },
    bar3:{
        // display:'flex',
    },
    bar5:{
      display:'flex',
  },

    lbl:{
      paddingRight: '10px',
  
    },

    sizeOption:{
      display:'none'
    },
    
    bar4:{
        background:'none',
        padding:'10px',
        marginTop:'5px',
        marginBottom:'5px',
        justifyContent:'space-between'
    },

    barBtn:{
        padding: '10px',
        margin: '5px',
    alignItems: 'center',
    background: 'white',
    width: '74px',
    justifyContent: 'center'
    },
    barBtn2:{
        padding: '10px',
        margin: '5px',
    alignItems: 'center',
    background: 'white',
    width: '74px',
    justifyContent: 'center'
    },
    barBtn3:{
        padding: '10px',
        margin: '5px',
    alignItems: 'center',
    background: 'white',
    width: '74px',
    justifyContent: 'center',
    border:'none'
    },
    barFont:{
        fontSize: '8px'

    },
    barContainer:{
        display:'flex',
        height: '308px',
        width: '300px',
        marginLeft: '20px'
    },
    slevebtn:{
        background:'#2C2D2D',
        padding: '5px',
        fontSize: '12px',
        color:'white',
        width: '61%',
        margin:'5px',
        '&:hover': {
            background: '#31c5ee',
         },
    },
    download:{
      background:'#2C2D2D',
      padding: '5px',
      fontSize: '12px',
      color:'white',
      margin:'5px',
      '&:hover': {
          background: '#31c5ee',
       },
  },
    tabs: {

        // padding: '15px',
        // textAlign: 'center',
        // width: '50%',
        // background: 'rgba(128, 128, 128, 0.075)',
        // cursor: 'pointer',
        // borderBottom: '1px solid rgba(0, 0, 0, 0.274)',
        // boxSizing: 'content-box',
        // position: 'relative',
        // outline: 'none',
        // padding: '10px',
        // margin: '5px',
    alignItems: 'center',
    background: 'white',
    width: '74px',
    justifyContent: 'center'
      },
      
      activeTabs:  {
        background: 'white',
        width: '74px',
      },
      activeContent: {
        display: 'block'
      },
      content: {
        background: 'white',
        padding: '20px',
        width: '100%',
        height: '100%',
        display: 'none'
      },
      activeContent: {
        display: 'block'
      },
      spanback2:{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${mockup})`
      },
      style2 : {
        backgroundImage: `url(${mockup})`,
        width:'100%'
        
      },
      icon: {
        fill: 'white',
        padding: '8px',
        borderRadius: '50px',
        background: 'light blue',
        
        height: '78',
        color: 'black',
        boxShadow: 'none',
    
      },
      tshirtDiv:{
        width: '530px',
        height: '500px',
        position: 'relative'
      },
      customizePrice:{
        padding: '10px',
        border: 'solid',
        fontSize: '18px',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      drawImage:{
        position: 'absolute',
        top: '100px',
        zIndex: '10',
        width: '200px',
        height: '400px',
        marginLeft: '49px'
      }
}));

export default useStyles;