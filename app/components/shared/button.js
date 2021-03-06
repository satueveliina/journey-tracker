import React from 'react';
import PropTypes from 'prop-types';
import { Text, ActivityIndicator as Spinner } from 'react-native';
import NativeButton from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../styles/theme';

const Button = (props) => {
  const { loading, icon, children, style, onPress, text } = props;
  const buttonStyle = theme[`${props.theme}Button`];
  const textStyle = theme.buttonText;
  const displayIcon = icon && !loading;
  const iconPadding = icon && text ? 6 : 0;

  return (
    <NativeButton loading={loading} style={[buttonStyle, style]} onPress={onPress}>
      { text ? <Text style={textStyle}>{text}</Text> : null}
      { displayIcon ?
        (<Icon
          name={icon}
          size={20}
          style={[textStyle, { paddingLeft: iconPadding }]}
        />) : null}
      { loading ? <Spinner style={theme.buttonSpinner} color={textStyle.color} /> : null }
      { children }
    </NativeButton>
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
  style: PropTypes.shape({}),
  text: PropTypes.string,
  icon: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'subtle']),
};

Button.defaultProps = {
  loading: false,
  text: null,
  children: null,
  icon: null,
  style: {},
  theme: 'default',
};

export default Button;
