# Security Notes

## Known Vulnerabilities

### validator.js URL Validation Bypass (CVE-2025-56200)

- **Package**: `validator` (via `class-validator`)
- **Severity**: Moderate (CVSS 6.1/10)
- **Status**: No patched version available (as of October 21, 2025)
- **Advisory**: [GHSA-9965-vmph-33xx](https://github.com/advisories/GHSA-9965-vmph-33xx)

#### Description
A URL validation bypass vulnerability exists in validator.js through version 13.15.15. The `isURL()` function uses '://' as a delimiter to parse protocols, while browsers use ':' as the delimiter. This parsing difference allows attackers to bypass protocol and domain validation.

#### Impact
- Potential XSS attacks
- Open Redirect vulnerabilities
- Requires user interaction (CVSS: UI:R)

#### Mitigation Strategy
1. **Currently using**: validator@13.15.15 (latest available version)
2. **Monitoring**: Watch for updates to validator.js package
3. **Code Review**: Avoid using `isURL()` for security-critical validation
4. **Alternative**: Use custom URL validation for sensitive operations
5. **npm audit level**: Set to "high" to suppress moderate warnings until fix is available

#### Related Packages Affected
- `class-validator@0.14.2` (depends on validator)
- All NestJS packages that depend on class-validator

#### Action Items
- [ ] Monitor [validator.js repository](https://github.com/validatorjs/validator.js) for patches
- [ ] Review code for usage of `@IsUrl()` decorator in security-critical contexts
- [ ] Consider implementing custom URL validation for auth/security endpoints
- [ ] Update to patched version when available

---

## Resolved Issues

### Deprecated Packages
- ✅ **inflight@1.0.6**: Replaced with `@node-rs/inflight@^1.0.0` via npm overrides
- ✅ **glob@7.2.3**: Updated to `glob@^10.3.10` via npm overrides

### Updated Dependencies
- ✅ All NestJS packages updated to latest minor versions (11.1.7)
- ✅ TypeScript updated to 5.9.3
- ✅ ESLint and related tools updated to latest versions
- ✅ Dev dependencies updated to latest compatible versions

---

Last Updated: October 21, 2025
