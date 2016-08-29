import React, {Component} from 'react'
import config from '../../../config/config'
import t from 't-component'
import bus from 'bus'

export default class UserBadge extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuUserBadge: false,
      canChangeTopics: false
    }
    this.setChangeTopicsPermission = this.setChangeTopicsPermission.bind(this)
  }
  // TODO https://stackoverflow.com/questions/23821768/how-to-listen-for-click-events-that-are-outside-of-a-component
  componentDidMount () {
    bus.on('forum:change', this.setChangeTopicsPermission)
  }

  componentWillUnmount () {
    bus.off('forum:change', this.setChangeTopicsPermission)
  }

  setChangeTopicsPermission (forum) {
    this.setState({canChangeTopics: (forum && forum.privileges.canChangeTopics)})
  }

  toggleMenu (e) {
    e.preventDefault()
    this.setState({menuUserBadge: !this.state.menuUserBadge})
  }

  render () {
    var menuItemAdmin
    if (config.multiForum && this.props.user.privileges && this.props.user.privileges.canManage) {
      menuItemAdmin = (
        <li>
          <a href='/settings/forums'>{t('header.forums')}</a>
        </li>
      )
    } else {
      menuItemAdmin = (
        <li className='admin-link'>
          <a href='/admin'>{t('header.admin')}</a>
        </li>
      )
    }

    var classes = 'user-badge pull-right' +
      (this.state.menuUserBadge ? ' active' : '') +
      (this.state.canChangeTopics ? ' can-change-forum' : '')

    return (
      <div className='user' style={{color: config.headerFontColor}}>
        <div className='user-wrapper'>
          <div className='notifications-badge pull-left hidden-xs'>
            <a href='/notifications' className='btn notifications'>
              <span className='icon-bell bell'></span>
            </a>
          </div>
          <div className={classes} onClick={this.toggleMenu.bind(this)}>
            <a href='#' className='btn profile'>
              <img src={this.props.user.profilePicture()} alt='' />
              <span className='name ellipsis'>{this.props.user.firstName}</span>
              <span className='caret'></span>
            </a>
            <ul className='dropdown-list'>
              {menuItemAdmin}
              <li className='visible-xs'>
                <a href='/notifications'>{t('notifications.title')}</a>
              </li>
              <li>
                <a href='/settings'>{t('header.settings')}</a>
              </li>
              {config.frequentlyAskedQuestions && <li><a href='/help/faq'>{t('help.faq.title')}</a></li>}
              {config.termsOfService && <li><a href='/help/terms-of-service'>{t('help.tos.title')}</a></li>}
              {config.privacyPolicy && <li><a href='/help/privacy-policy'>{t('help.pp.title')}</a></li>}
              {config.glossary && <li><a href='/help/glossary'>{t('help.glossary.title')}</a></li>}
              <li>
                <a
                  onClick={
                    (e) => {
                      e.preventDefault()
                      bus.emit('logout')
                    }
                  }
                  href='/logout'>
                  {t('header.logout')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}