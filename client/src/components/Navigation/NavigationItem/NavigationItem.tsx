import { Link, useLocation } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import cx from 'clsx';

import { NavigationLink } from '@/config/navigation.config';

import styles from './NavigationItem.module.scss';

interface NavigationItemProps extends NavigationLink {
  onExpandCategory?: (text: string) => void;
}

const NavigationItem = ({ id, text, icon: Icon, children, path, onExpandCategory }: NavigationItemProps) => {
  const { pathname } = useLocation();

  const isActive = pathname === path || children?.some(child => pathname === child.path);

  const handleExpandCategory = () => {
    if (!path && onExpandCategory) {
      onExpandCategory(id);
    }
  };

  const renderNavigationItem = () => (
    <ListItemButton className={cx(styles.item, { [styles.active]: isActive })} onClick={handleExpandCategory}>
      {Icon && (
        <ListItemIcon className={cx(styles.iconWrapper)}>
          <Icon size={24} />
        </ListItemIcon>
      )}
      <ListItemText
        primary={text}
        className={cx(styles.listText, { [styles.active]: isActive })}
        slotProps={{ primary: { variant: 'h2', fontWeight: 500, textAlign: 'center' } }}
      />
    </ListItemButton>
  );

  return (
    <ListItem classes={{ root: styles.root }} disableGutters className={styles.container}>
      {path ? (
        <Link to={path} className={styles.link}>
          {renderNavigationItem()}
        </Link>
      ) : (
        renderNavigationItem()
      )}
    </ListItem>
  );
};

export default NavigationItem;
