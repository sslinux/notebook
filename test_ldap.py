#!/usr/bin/env python

import ldap
import ldif
import sys

def authenticate(address, username, password):
    conn = ldap.initialize('ldap://' + address)
    conn.protocol_version = 3
    conn.set_option(ldap.OPT_REFERRALS, 0)

    try:
        result = conn.simple_bind_s(username, password)
        ldif_writer = ldif.LDIFWriter(sys.stdout)
        basedn = "OU=Symbio - Beijing,DC=symbio,DC=com"
        results = conn.search_s(basedn,ldap.SCOPE_SUBTREE,"(cn=*)")
        for dn,entry in results:
            ldif_writer.unparse(dn,entry)
    except ldap.INVALID_CREDENTIALS:
        return "Invalid credentials"
    except ldap.SERVER_DOWN:
        return "Server down"
    except ldap.LDAPError, e:
        if type(e.message) == dict and e.message.has_key('desc'):
            return "Other LDAP error: " + e.message['desc']
        else: 
            return "Other LDAP error: " + e
    finally:
        conn.unbind_s()

    return "Succesfully authenticated"



# import ldap
