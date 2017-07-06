/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Easing,
  View
} from 'react-native'

export default class ProgressBar extends Component {
  static propTypes = {
    animated: PropTypes.bool,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    children: PropTypes.node,
    color: PropTypes.string,
    height: PropTypes.number,
    progress: PropTypes.number,
    style: View.propTypes.style,
    unfilledColor: PropTypes.string,
    width: PropTypes.number
  };

  static defaultProps = {
    animated: true,
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    height: 6,
    progress: 0,
    width: 150
  };

  constructor (props) {
    super(props)
    const progress = Math.min(Math.max(props.progress, 0), 1)
    this.state = {
      width: 0,
      progress: new Animated.Value(progress)
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps (props) {
    if (props.duration !== -1 && props.duration !== this.props.duration) {
      this.animate(props.duration)
    }
  }

  animate (duration) {
    setTimeout(() => {
      this.state.progress.setValue(0)
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        isInteraction: false
      }).start((endState) => {
        if (endState.finished) {
          this.state.progress.setValue(0)
          return
        }
      })
    }, 200)
  }

  render () {
    const {
      borderColor,
      borderRadius,
      borderWidth,
      children,
      color,
      height,
      style,
      unfilledColor,
      width,
      ...restProps
    } = this.props

    const innerWidth = Math.max(0, 280 || this.state.width) - (borderWidth * 2)
    const containerStyle = {
      width: 280,
      position: 'absolute',
      height: 50,
      overflow: 'hidden'
    }
    const progressStyle = {
      backgroundColor: 'rgba(48, 104, 68, 0.5)',
      height: 50,
      transform: [{
        translateX: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [innerWidth / -2, 0]
        })
      }, {
        // Interpolation a temp workaround for https://github.com/facebook/react-native/issues/6278
        scaleX: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.0001, 1]
        })
      }]
    }

    return (
      <View style={[containerStyle, style]} onLayout={this.handleLayout} {...restProps}>
        <Animated.View style={progressStyle} />
        {children}
      </View>
    )
  }
}
