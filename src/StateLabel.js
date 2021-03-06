import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import {GitMerge, GitPullRequest, IssueClosed, IssueOpened} from '@githubprimer/octicons-react'
import theme, {colors} from './theme'
import {withSystemProps, COMMON} from './system-props'
import StyledOcticon from './StyledOcticon'

const statusMap = {
  issueClosed: colors.red[6],
  pullClosed: colors.red[6],
  pullMerged: colors.purple[5],
  issueOpened: '#2cbe4e', // This was generated by a sass function in Primer, so using a hex here
  pullOpened: '#2cbe4e', // This was generated by a sass function in Primer, so using a hex here
  gray: colors.gray[5]
}

const octiconMap = {
  issueOpened: IssueOpened,
  pullOpened: GitPullRequest,
  issueClosed: IssueClosed,
  pullClosed: GitPullRequest,
  pullMerged: GitMerge
}

function StateLabel({className, status, small = false, children}) {
  const octiconProps = small ? {width: '1em'} : {}
  return (
    <span className={className}>
      {status && <StyledOcticon mr={1} {...octiconProps} icon={octiconMap[status]} />}
      {children}
    </span>
  )
}

const styledLabel = styled(StateLabel)`
  display: inline-flex;
  align-items: center;
  padding: ${props => (props.small ? `0.125em ${theme.space[1]}px` : `${theme.space[1]}px ${theme.space[2]}px`)};
  font-weight: 600;
  line-height: 20px;
  color: ${colors.white};
  font-size: ${props => (props.small ? `${theme.fontSizes[0]}px` : `${theme.fontSizes[1]}px`)};
  text-align: center;
  background-color: ${props => (props.status ? statusMap[props.status] : statusMap.gray)};
  border-radius: ${theme.radii[1]}px;
`

StateLabel.propTypes = {
  small: PropTypes.bool,
  status: PropTypes.oneOf(['issueOpened', 'pullOpened', 'issueClosed', 'pullClosed', 'pullMerged'])
}

export default withSystemProps(styledLabel, COMMON)
