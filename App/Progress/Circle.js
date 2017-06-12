import React, { Component } from 'react'
import {
  Animated,
  ART,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import Arc from './Shapes/Arc'
import withAnimation from './withAnimation'
import Icon from 'react-native-vector-icons/FontAwesome'

const CIRCLE = Math.PI * 2

const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface)
const AnimatedArc = Animated.createAnimatedComponent(Arc)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden'
  }
})

export class ProgressCircle extends Component {

  static defaultProps = {
    borderWidth: 0,
    color: 'rgba(0, 122, 255, 1)',
    direction: 'clockwise',
    formatText: '100',
    progress: 0,
    duration: 0,
    showsText: true,
    size: 40,
    thickness: 3
  }

  constructor (props, context) {
    super(props, context)

    this.progressValue = 0
  }

  componentWillMount () {
    if (this.props.animated) {
      this.props.progress.addListener((event) => {
        this.progressValue = event.value
        if (this.progressValue === 1) {
          this.forceUpdate()
        }
      })
    }
  }

  icon () {
    if (this.props.recorded) {
      return <Icon name='play' size={50} color={this.props.color} />
    } else if (this.props.recording) {
      return <Icon name='stop' size={50} color={this.props.color} />
    } else {
      return <Icon name='microphone' size={50} color={this.props.color} />
    }
  }

  render () {
    const {
      animated,
      borderColor,
      borderWidth,
      color,
      children,
      direction,
      indeterminate,
      progress,
      rotation,
      size,
      style,
      textStyle,
      thickness,
      unfilledColor,
      onClick,
      ...restProps
    } = this.props

    const border = borderWidth || (indeterminate ? 1 : 1)

    const radius = (size / 2) - border
    const offset = {
      top: border,
      left: border
    }
    const textOffset = border + thickness
    const textSize = size - (textOffset * 2)

    const Surface = rotation ? AnimatedSurface : ART.Surface
    const Shape = animated ? AnimatedArc : Arc
    const progressValue = animated ? this.progressValue : progress
    const angle = animated ? Animated.multiply(progress, CIRCLE) : progress * CIRCLE

    return (
      <View style={[styles.container, style]} {...restProps}>
        <Surface
          width={size}
          height={size}
          style={{
            transform: [{
              rotate: indeterminate && rotation
                ? rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })
                : '0deg'
            }]
          }}
        >
          {unfilledColor && progressValue !== 1 ? (
            <Shape
              radius={radius}
              offset={offset}
              startAngle={angle}
              endAngle={CIRCLE}
              direction={direction}
              stroke={unfilledColor}
              strokeWidth={thickness}
            />
          ) : false}
          <Shape
            radius={radius}
            offset={offset}
            startAngle={0}
            endAngle={angle}
            direction={direction}
            stroke={color}
            strokeWidth={thickness}
          />
          {indeterminate ? (
            <Arc
              radius={size / 2}
              startAngle={0}
              endAngle={0.4 * Math.PI}
              stroke={borderColor || color}
              strokeWidth={14}
            />
          ) : false}
        </Surface>
        <TouchableOpacity
          onPress={onClick}
          style={{
            position: 'absolute',
            left: textOffset,
            top: textOffset,
            width: textSize,
            height: textSize,
            borderRadius: textSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          }}>
          <View>
            <Text
              style={[{
                color,
                fontSize: textSize / 4.5,
                fontWeight: '300'
              }, textStyle]}
            >
              {this.icon()}
            </Text>
          </View>
        </TouchableOpacity>
        {children}
      </View>
    )
  }
}

export default withAnimation(ProgressCircle)
