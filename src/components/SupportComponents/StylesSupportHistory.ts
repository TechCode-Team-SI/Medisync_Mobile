import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  ticketButton: {
    backgroundColor: '#E5E7EB',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#3B82F6',
    borderRadius: 50,
    padding: 8,
    marginRight: 8,
    marginTop: 16,
  },
  ticketContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  typeText: {
    fontSize: 14,
    color: '#DC2626',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4B5563',
  },
});

export default styles;
