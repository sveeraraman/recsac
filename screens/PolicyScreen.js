import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import colors from "../constants/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as cons from "../constants/constantkeys";

const PolicyScreen = (props) => {
  var domainname = cons.DOMAIN_NAME_PLAIN;

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.headingtext}>Terms and Conditions</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titletext}>
              Thank you for choosing {domainname}!
            </Text>
            <Text style={styles.content}>
              These terms and conditions ("Agreement") sets forth the general
              terms and conditions of your use of the "Recsac" mobile
              application ("Mobile Application" or "Service") and any of its
              related products and services (collectively, "Services"). This
              Agreement is legally binding between you ("User", "you" or "your")
              and this Mobile Application developer ("Operator", "we", "us" or
              "our"). By accessing and using the Mobile Application and
              Services, you acknowledge that you have read, understood, and
              agree to be bound by the terms of this Agreement. If you are
              entering into this Agreement on behalf of a business or other
              legal entity, you represent that you have the authority to bind
              such entity to this Agreement, in which case the terms "User",
              "you" or "your" shall refer to such entity. If you do not have
              such authority, or if you do not agree with the terms of this
              Agreement, you must not accept this Agreement and may not access
              and use the Mobile Application and Services. You acknowledge that
              this Agreement is a contract between you and the Operator, even
              though it is electronic and is not physically signed by you, and
              it governs your use of the Mobile Application and Services.
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titletext}>Accounts and membership</Text>
            <Text style={styles.content}>
              You must be at least 18 years of age to use the Mobile Application
              and Services. By using the Mobile Application and Services and by
              agreeing to this Agreement you warrant and represent that you are
              at least 18 years of age. If you create an account in the Mobile
              Application, you are responsible for maintaining the security of
              your account and you are fully responsible for all activities that
              occur under the account and any other actions taken in connection
              with it. We may, but have no obligation to, monitor and review new
              accounts before you may sign in and start using the Services.
              Providing false contact information of any kind may result in the
              termination of your account. You must immediately notify us of any
              unauthorized uses of your account or any other breaches of
              security. We will not be liable for any acts or omissions by you,
              including any damages of any kind incurred as a result of such
              acts or omissions. We may suspend, disable, or delete your account
              (or any part thereof) if we determine that you have violated any
              provision of this Agreement or that your conduct or content would
              tend to damage our reputation and goodwill. If we delete your
              account for the foregoing reasons, you may not re-register for our
              Services. We may block your email address and Internet protocol
              address to prevent further registration.
            </Text>

            <Text style={styles.titletext}>Advertisements</Text>
            <Text style={styles.content}>
              During your use of the Mobile Application and Services, you may
              enter into correspondence with or participate in promotions of
              advertisers or sponsors showing their goods or services through
              the Mobile Application and Services. Any such activity, and any
              terms, conditions, warranties or representations associated with
              such activity, is solely between you and the applicable third
              party. We shall have no liability, obligation or responsibility
              for any such correspondence, purchase or promotion between you and
              any such third party.
            </Text>

            <Text style={styles.titletext}>Links to other resources</Text>
            <Text style={styles.content}>
              Although the Mobile Application and Services may link to other
              resources (such as websites, mobile applications, etc.), we are
              not, directly or indirectly, implying any approval, association,
              sponsorship, endorsement, or affiliation with any linked resource,
              unless specifically stated herein. We are not responsible for
              examining or evaluating, and we do not warrant the offerings of,
              any businesses or individuals or the content of their resources.
              We do not assume any responsibility or liability for the actions,
              products, services, and content of any other third parties. You
              should carefully review the legal statements and other conditions
              of use of any resource which you access through a link in the
              Mobile Application and Services. Your linking to any other
              off-site resources is at your own risk.
            </Text>

            <Text style={styles.titletext}>Prohibited uses</Text>
            <Text style={styles.content}>
              In addition to other terms as set forth in the Agreement, you are
              prohibited from using the Mobile Application and Services or
              Content: (a) for any unlawful purpose; (b) to solicit others to
              perform or participate in any unlawful acts; (c) to violate any
              international, federal, provincial or state regulations, rules,
              laws, or local ordinances; (d) to infringe upon or violate our
              intellectual property rights or the intellectual property rights
              of others; (e) to harass, abuse, insult, harm, defame, slander,
              disparage, intimidate, or discriminate based on gender, sexual
              orientation, religion, ethnicity, race, age, national origin, or
              disability; (f) to submit false or misleading information; (g) to
              upload or transmit viruses or any other type of malicious code
              that will or may be used in any way that will affect the
              functionality or operation of the Mobile Application and Services,
              third party products and services, or the Internet; (h) to spam,
              phish, pharm, pretext, spider, crawl, or scrape; (i) for any
              obscene or immoral purpose; or (j) to interfere with or circumvent
              the security features of the Mobile Application and Services,
              third party products and services, or the Internet. We reserve the
              right to terminate your use of the Mobile Application and Services
              for violating any of the prohibited uses.
            </Text>

            <Text style={styles.titletext}>Intellectual property rights</Text>
            <Text style={styles.content}>
              "Intellectual Property Rights" means all present and future rights
              conferred by statute, common law or equity in or in relation to
              any copyright and related rights, trademarks, designs, patents,
              inventions, goodwill and the right to sue for passing off, rights
              to inventions, rights to use, and all other intellectual property
              rights, in each case whether registered or unregistered and
              including all applications and rights to apply for and be granted,
              rights to claim priority from, such rights and all similar or
              equivalent rights or forms of protection and any other results of
              intellectual activity which subsist or will subsist now or in the
              future in any part of the world. This Agreement does not transfer
              to you any intellectual property owned by the Operator or third
              parties, and all rights, titles, and interests in and to such
              property will remain (as between the parties) solely with the
              Operator. All trademarks, service marks, graphics and logos used
              in connection with the Mobile Application and Services, are
              trademarks or registered trademarks of the Operator or its
              licensors. Other trademarks, service marks, graphics and logos
              used in connection with the Mobile Application and Services may be
              the trademarks of other third parties. Your use of the Mobile
              Application and Services grants you no right or license to
              reproduce or otherwise use any of the Operator or third party
              trademarks.
            </Text>

            <Text style={styles.titletext}>Disclaimer of warranty</Text>
            <Text style={styles.content}>
              You agree that such Service is provided on an "as is" and "as
              available" basis and that your use of the Mobile Application and
              Services is solely at your own risk. We expressly disclaim all
              warranties of any kind, whether express or implied, including but
              not limited to the implied warranties of merchantability, fitness
              for a particular purpose and non-infringement. We make no warranty
              that the Services will meet your requirements, or that the Service
              will be uninterrupted, timely, secure, or error-free; nor do we
              make any warranty as to the results that may be obtained from the
              use of the Service or as to the accuracy or reliability of any
              information obtained through the Service or that defects in the
              Service will be corrected. You understand and agree that any
              material and/or data downloaded or otherwise obtained through the
              use of Service is done at your own discretion and risk and that
              you will be solely responsible for any damage or loss of data that
              results from the download of such material and/or data. We make no
              warranty regarding any goods or services purchased or obtained
              through the Service or any transactions entered into through the
              Service. No advice or information, whether oral or written,
              obtained by you from us or through the Service shall create any
              warranty not expressly made herein.
            </Text>

            <Text style={styles.titletext}>Limitation of liability</Text>
            <Text style={styles.content}>
              To the fullest extent permitted by applicable law, in no event
              will the Operator, its affiliates, directors, officers, employees,
              agents, suppliers or licensors be liable to any person for any
              indirect, incidental, special, punitive, cover or consequential
              damages (including, without limitation, damages for lost profits,
              revenue, sales, goodwill, use of content, impact on business,
              business interruption, loss of anticipated savings, loss of
              business opportunity) however caused, under any theory of
              liability, including, without limitation, contract, tort,
              warranty, breach of statutory duty, negligence or otherwise, even
              if the liable party has been advised as to the possibility of such
              damages or could have foreseen such damages. To the maximum extent
              permitted by applicable law, the aggregate liability of the
              Operator and its affiliates, officers, employees, agents,
              suppliers and licensors relating to the services will be limited
              to an amount greater of one dollar or any amounts actually paid in
              cash by you to the Operator for the prior one month period prior
              to the first event or occurrence giving rise to such liability.
              The limitations and exclusions also apply if this remedy does not
              fully compensate you for any losses or fails of its essential
              purpose.
            </Text>

            <Text style={styles.titletext}>Indemnification</Text>
            <Text style={styles.content}>
              You agree to indemnify and hold the Operator and its affiliates,
              directors, officers, employees, agents, suppliers and licensors
              harmless from and against any liabilities, losses, damages or
              costs, including reasonable attorneys' fees, incurred in
              connection with or arising from any third party allegations,
              claims, actions, disputes, or demands asserted against any of them
              as a result of or relating to your Content, your use of the Mobile
              Application and Services or any willful misconduct on your part.
            </Text>

            <Text style={styles.titletext}>Severability</Text>
            <Text style={styles.content}>
              All rights and restrictions contained in this Agreement may be
              exercised and shall be applicable and binding only to the extent
              that they do not violate any applicable laws and are intended to
              be limited to the extent necessary so that they will not render
              this Agreement illegal, invalid or unenforceable. If any provision
              or portion of any provision of this Agreement shall be held to be
              illegal, invalid or unenforceable by a court of competent
              jurisdiction, it is the intention of the parties that the
              remaining provisions or portions thereof shall constitute their
              agreement with respect to the subject matter hereof, and all such
              remaining provisions or portions thereof shall remain in full
              force and effect.
            </Text>

            <Text style={styles.titletext}>Dispute resolution</Text>
            <Text style={styles.content}>
              The formation, interpretation, and performance of this Agreement
              and any disputes arising out of it shall be governed by the
              substantive and procedural laws of Ontario, Canada without regard
              to its rules on conflicts or choice of law and, to the extent
              applicable, the laws of Canada. The exclusive jurisdiction and
              venue for actions related to the subject matter hereof shall be
              the courts located in Ontario, Canada, and you hereby submit to
              the personal jurisdiction of such courts. You hereby waive any
              right to a jury trial in any proceeding arising out of or related
              to this Agreement. The United Nations Convention on Contracts for
              the International Sale of Goods does not apply to this Agreement.
            </Text>

            <Text style={styles.titletext}>Assignment</Text>
            <Text style={styles.content}>
              You may not assign, resell, sub-license or otherwise transfer or
              delegate any of your rights or obligations hereunder, in whole or
              in part, without our prior written consent, which consent shall be
              at our own sole discretion and without obligation; any such
              assignment or transfer shall be null and void. We are free to
              assign any of its rights or obligations hereunder, in whole or in
              part, to any third party as part of the sale of all or
              substantially all of its assets or stock or as part of a merger.
            </Text>

            <Text style={styles.titletext}>Changes and amendments</Text>
            <Text style={styles.content}>
              We reserve the right to modify this Agreement or its terms
              relating to the Mobile Application and Services at any time,
              effective upon posting of an updated version of this Agreement in
              the Mobile Application. When we do, we will revise the updated
              date at the bottom of this page. Continued use of the Mobile
              Application and Services after any such changes shall constitute
              your consent to such changes.
            </Text>

            <Text style={styles.titletext}>Acceptance of these terms</Text>
            <Text style={styles.content}>
              You acknowledge that you have read this Agreement and agree to all
              its terms and conditions. By accessing and using the Mobile
              Application and Services you agree to be bound by this Agreement.
              If you do not agree to abide by the terms of this Agreement, you
              are not authorized to access or use the Mobile Application and
              Services.
            </Text>

            <Text style={styles.titletext}>Contacting us</Text>
            <Text style={styles.content}>
              If you would like to contact us to understand more about this
              Agreement or wish to contact us concerning any matter relating to
              it, you may do so via the contact form
            </Text>

            <Text style={styles.titletext}>
              This document was last updated on August 8, 2020
            </Text>
          </View>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.buttonTitle}>Accept</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

PolicyScreen.navigationOptions = {
  headerTitle: "Terms and Conditions",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.subprimarycolor,
    borderWidth: 0,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 12,
    color: colors.fontDefColor,
    alignItems: "flex-start",
    width: "100%",
    //paddingTop: 20,
    //borderWidth:1
  },
  titletext: {
    fontSize: 16,
    color: colors.fontDefColor,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
  },
  content: {
    fontSize: 14,
    color: colors.fontDefColor,
  },
  heading: {
    fontSize: 20,
    color: colors.primaryColor,
    alignItems: "center",
    flex: 1,
    paddingTop: 50,
    padding: 20,
    fontWeight: "bold",
  },
  headingtext: {
    fontSize: 20,
    color: colors.primaryColor,
    flex: 1,
    //padding: 20,
    fontWeight: "bold",
  },
  buttonTitle: {
    color: colors.blackIconColor,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
  },
  button: {
    backgroundColor: colors.buttonColor,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PolicyScreen;
