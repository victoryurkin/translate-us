import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '@translate-us/styles';

export const PrivacyPolicy = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.strong}>Who We Are</Text>
      <Text style={styles.paragraph}>
        WhiteOf Corporation is the company who created the Moneydad. Whiteof
        Corporation is located in Brooklyn, New York. This organization
        primarily operates in the Software Development.
      </Text>
      <Text style={styles.strong}>Information Collection and Use</Text>
      <Text style={styles.paragraph}>
        We should notify you that the app will collect some personal data. They
        are user’s name and the phone number. We assure that this private
        information won’t be used in commercial purposes and won’t be given to
        third party.
      </Text>

      <Text style={styles.strong}>Why We Collect Personal Data</Text>
      <Text style={styles.paragraph}>
        The work of the app "Moneydad" requires some personal data. This data
        will be used to help a user to restore access to the application. Phone
        number is used by the app in order to remind passcode or nickname using
        SMS service.
      </Text>

      <Text style={styles.strong}>Cookies</Text>
      <Text style={styles.paragraph}>
        Cookies are files with small amount of data that is commonly used an
        anonymous unique identifier. These are sent to your browser from the
        website that you visit and are stored on your device internal memory.
        Moneydad application does not use the "cookies" explicitly.
      </Text>

      <Text style={styles.strong}>Security</Text>
      <Text style={styles.paragraph}>
        We value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and we cannot guarantee
        its absolute security.
      </Text>

      <Text style={styles.strong}>Changes to This Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update our Privacy Policy from time to time. Thus, you are
        advised to review this page periodically for any changes. We will notify
        you of any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately after they are posted on this page.
      </Text>

      <Text style={styles.strong}>Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to info@whiteof.com.
      </Text>
      <Text style={styles.paragraph}>WhiteOf Corporation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.mega,
  },
  strong: {
    fontWeight: 'bold',
  },
  paragraph: {
    marginVertical: spacing.sm,
  },
});
