const ticketOptionsStyle = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

export default ticketOptionsStyle;
