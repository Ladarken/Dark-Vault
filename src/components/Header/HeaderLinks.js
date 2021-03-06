/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import { renderIcon } from '@download/blockies'
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons
import TranslateIcon from '@material-ui/icons/Translate';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// hooks
import { useTranslation } from 'react-i18next';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

{/* <Tabs className={classes.tabs} value={tabValue} onChange={changeTabs}>
<Tab value='' label='Home' id='bar-tab-0'/>
<Tab value='vault' label='Vault' id='bar-tab-1'/>
<Tab value='stake' label='Stake' id='bar-tab-2'/>
</Tabs> */}

const tabArr = [
  { value: '', label: 'Home' },
  // {value:'vault',label:'Vault'},
  { value: 'stake/pool/4', label: 'Stake' },
]

export default function HeaderLinks(props) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  let history = useHistory();
  const { dropdownHoverColor, connected, address, connectWallet, disconnectWallet } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [lng, setLanguage] = useState('en');
  const [shortAddress, setShortAddress] = useState('');
  const [dataUrl, setDataUrl] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!connected) return;
    const canvas = canvasRef.current
    renderIcon({ seed: address.toLowerCase() }, canvas)
    const updatedDataUrl = canvas.toDataURL()
    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl)
    }
    if (address.length < 11) {
      setShortAddress(address)
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`)
    }
  }, [dataUrl, address])

  // const switchLanguage = () => {
  //   switch (i18n.language) {
  //     case 'zh':
  //     case 'zh-CN':
  //       return '中文'
  //     case 'en':
  //       return 'English'
  //     case 'ja':
  //       return '日本語'
  //     case 'th':
  //       return 'ไทย'
  //     case 'ko':
  //       return '한글'
  //     default:
  //       return '中文'
  //   }
  // }

  // const handleClick = event => {
  //   console.log(event)
  //   switch (event) {
  //     case 'English':
  //       return i18n.changeLanguage('en').then(() => setLanguage(event))
  //     case '中文':
  //       return i18n.changeLanguage('zh').then(() => setLanguage(event))
  //     case '日本語':
  //       return i18n.changeLanguage('ja').then(() => setLanguage(event))
  //     case 'ไทย':
  //       return i18n.changeLanguage('th').then(() => setLanguage(event))
  //     case '한글':
  //       return i18n.changeLanguage('ko').then(() => setLanguage(event))
  //     default:
  //       return i18n.changeLanguage('en').then(() => setLanguage(event))
  //   }
  // }

  const changeTabs = (newValue) => {
    history.push({
      pathname: '/' + newValue,
      state: {
      }
    })
  }

  // useEffect(() => {
  //   const lng = switchLanguage()
  //   setLanguage(lng);
  // });

  let defaultTabValue = '';
  if (window.location.hash != '#/' && window.location.hash != '#/index') {
    defaultTabValue = window.location.hash.split('/')[1];
    if (defaultTabValue !== '') {
      defaultTabValue = defaultTabValue + "/pool/4";
      console.log(defaultTabValue)
    }
  }
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      {
        tabArr.map((item, index) => (
          <ListItem key={'tab-' + index} className={classes.listItem}>
            <Button
              type="button"
              color="transparent"
              onClick={changeTabs.bind(this, item.value)}
              className={item.value == defaultTabValue ? classes.nowShowPage : ''}
            >
              {item.label}
            </Button>
          </ListItem>
        ))
      }
      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          navDropdown
          hoverColor='#ccc'
          buttonText='links'
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          dropdownList={[
            { divider: true },
            <a
              href="https://dark-vision.netlify.app"
              target="_blank"
            >
              Vision
            </a>,
            <a
              href="https://dark-liquidity.netlify.app"
              target="_blank"
            >
              Liquidity
            </a>,
            <a
              href="https://dark-exchange.netlify.app"
              target="_blank"
            >
              Exchange
            </a>,
            { divider: true },
          //   <a
          //     href="https://discord.gg/darkbuild"
          //     target="_blank"
          //   >
          //     Discord
          //   </a>,
          //   <a
          //     href="https://twitter.com/DarkBuild1"
          //     target="_blank"
          //   >
          //     Twitter
          // </a>,
          ]}
        />

      </ListItem> */}
      <ListItem className={classes.listItem}>
        <Button
          style={{
            width: '180px',
            margin: '12px 0',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: '#4169e1',
            color: '#fff',
            boxShadow: '0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)',
          }}
          className={classes.Button}
          round
          type="button"
          color="primary"
          onClick={connected ? disconnectWallet : connectWallet}
        >
          {connected ? (
            <>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <Avatar alt="address" src={dataUrl} style={{
                width: '24px',
                height: "24px",
                marginRight: '4px',
              }} />{shortAddress}
            </>
          ) : (
              <>
                <i className={"yfiiicon yfii-help-circle"} style={{
                  width: '24px',
                  marginRight: '4px',
                }} />{t('Vault-Wallet')}
              </>
            )}
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
