import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { colors, fontSize, spacing } from '@translate-us/styles';

interface Props {
  onBack: () => void;
}

export const TermsOfUse: React.FC<Props> = ({ onBack }) => {
  const [isPressed, setPressed] = React.useState(false);

  return (
    <View>
      <LinearGradient
        colors={[colors.primary[700], colors.primary[500]]}
        style={styles.topBar}>
        <Pressable
          style={[
            styles.backButton,
            isPressed ? styles.backButtonPressed : styles.backButtonDefault,
          ]}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={onBack}>
          <ChevronLeftIcon color="white" />
        </Pressable>
        <Text style={styles.header}>Terms of Use</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Please read these Terms of Use ("Terms", "Terms of Use") carefully
          before using the Moneydad (the "Service") operated by WhiteOf
          Corporation ("us", "we", or "our").
        </Text>
        <Text style={styles.paragraph}>
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users and others who access or use the Service.
        </Text>
        <Text style={styles.paragraph}>
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service. Terms of Use Template for WhiteOf Corporation.
        </Text>
        <Text style={styles.strong}>Accounts</Text>
        <Text style={styles.paragraph}>
          When you create an account with us, you asked to provide us your name
          (or nickname) and phone number. This information can be used to
          restore you access to the Service and will not be provided to any
          third party.
        </Text>
        <Text style={styles.paragraph}>
          You also asked to create a passcode. You are responsible for
          safeguarding the passcode that you use to access the Service and for
          any activities or actions under your passcode, whether your passcode
          is with our Service or a third-party service.
        </Text>
        <Text style={styles.paragraph}>
          You agree not to disclose your password to any third party. You must
          notify us immediately upon becoming aware of any breach of security or
          unauthorized use of your account.
        </Text>
        <Text style={styles.strong}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          WhiteOf Corporation respects the privacy of its Service users. Please
          refer to WhiteOf Corporation’s Privacy Policy (found here:
          http://moneydad.net/privacy) which explains how we collect, use, and
          disclose information that pertains to your privacy. When you access or
          use the Service, you signify your agreement to this Privacy Policy.
        </Text>
        <Text style={styles.strong}>Intellectual Property</Text>
        <Text style={styles.paragraph}>
          You acknowledge and agree that we and our licensors retain ownership
          of all intellectual property rights of any kind related to the
          Service, including applicable copyrights, trademarks and other
          proprietary rights. Other product and WhiteOf Corporation names that
          are mentioned on the Service may be trademarks of their respective
          owners. We reserve all rights that are not expressly granted to you
          under this Agreement.
        </Text>
        <Text style={styles.strong}>Governing Law</Text>
        <Text style={styles.paragraph}>
          These Terms shall be governed and construed in accordance with the
          laws of United States, without regard to its conflict of law
          provisions.
        </Text>
        <Text style={styles.paragraph}>
          Our failure to enforce any right or provision of these Terms will not
          be considered a waiver of those rights. If any provision of these
          Terms is held to be invalid or unenforceable by a court, the remaining
          provisions of these Terms will remain in effect. These Terms
          constitute the entire agreement between us regarding our Service, and
          supersede and replace any prior agreements we might have between us
          regarding the Service.
        </Text>
        <Text style={styles.strong}>General Terms</Text>
        <Text style={styles.paragraph}>
          If any part of this Agreement is held invalid or unenforceable, that
          portion of the Agreement will be construed consistent with applicable
          law. The remaining portions will remain in full force and effect. Any
          failure on the part of WhiteOf Corporation to enforce any provision of
          this Agreement will not be considered a waiver of our right to enforce
          such provision. Our rights under this Agreement will survive any
          termination of this Agreement.
        </Text>
        <Text style={styles.paragraph}>
          You agree that any cause of action related to or arising out of your
          relationship with WhiteOf Corporation must commence within ONE year
          after the cause of action accrues. Otherwise, such cause of action is
          permanently barred.
        </Text>
        <Text style={styles.paragraph}>
          These Terms of Use and your use of the Site are governed by the laws
          of the United States of America, without regard to conflicts of law
          principles.
        </Text>
        <Text style={styles.paragraph}>
          WhiteOf Corporation may assign or delegate these Terms of Service
          and/or WhiteOf Corporation’s Privacy Policy, in whole or in part, to
          any person or entity at any time with or without your consent. You may
          not assign or delegate any rights or obligations under the Terms of
          Service or Privacy Policy without WhiteOf Corporation’s prior written
          consent, and any unauthorized assignment and delegation by you is
          void.
        </Text>
        <Text style={styles.strong}>Changes</Text>
        <Text style={styles.paragraph}>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will try to
          provide at least 30 days notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </Text>
        <Text style={styles.paragraph}>
          By continuing to access or use our Service after those revisions
          become effective, you agree to be bound by the revised terms. If you
          do not agree to the new terms, please stop using the Service.
        </Text>
        <Text style={styles.paragraph}>
          YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE, UNDERSTAND THE
          TERMS OF USE, AND WILL BE BOUND BY THESE TERMS AND CONDITIONS. YOU
          FURTHER ACKNOWLEDGE THAT THESE TERMS OF USE TOGETHER WITH THE PRIVACY
          POLICY AT http://moneydad.net/privacy REPRESENT THE COMPLETE AND
          EXCLUSIVE STATEMENT OF THE AGREEMENT BETWEEN US AND THAT IT SUPERSEDES
          ANY PROPOSAL OR PRIOR AGREEMENT ORAL OR WRITTEN, AND ANY OTHER
          COMMUNICATIONS BETWEEN US RELATING TO THE SUBJECT MATTER OF THIS
          AGREEMENT.
        </Text>
        <Text style={styles.strong}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at
          info@whiteof.com.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing['2xl'],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    position: 'absolute',
    zIndex: 10,
  },
  backButtonDefault: {
    opacity: 1,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backIcon: {},
  header: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    padding: spacing['2xl'],
    paddingBottom: spacing.mega,
  },
  strong: {
    fontWeight: 'bold',
  },
  paragraph: {
    marginVertical: spacing.sm,
  },
});
