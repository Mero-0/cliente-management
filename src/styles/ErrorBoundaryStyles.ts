import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#ecf0f1'
  },
  container: {
    textAlign: 'center',
    padding: theme.spacing(4)
  },
  icon: {
    fontSize: '5rem',
    color: '#e74c3c',
    marginBottom: theme.spacing(2)
  },
  title: {
    color: '#2c3e50',
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  description: {
    color: '#7f8c8d',
    marginBottom: theme.spacing(2)
  },
  details: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    borderRadius: '4px',
    marginBottom: theme.spacing(2),
    textAlign: 'left',
    maxHeight: '200px',
    overflow: 'auto',
    fontSize: '0.85rem',
    fontFamily: 'monospace'
  },
  button: {
    backgroundColor: '#34495e',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#2c3e50'
    }
  }
}));