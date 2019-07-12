import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form = new FormGroup({
    id: new FormControl(null, [Validators.required, this.roleValdator.bind(this)]),
    email: new FormControl(null, [Validators.required, Validators.maxLength(20), this.emailValidator.bind(this)]), // Validators.pattern(/^([0-9\s\.\-\"\']*)$/i)
    password: new FormControl(null, [Validators.required, Validators.maxLength(20), this.passwordValidator.bind(this)])
  })
  
  roles = null;
  loading = true;
  errorMessage = null;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private changeDef: ChangeDetectorRef 
  ){}

  ngOnInit() {
    Promise.all([
      this.initRoles(),
      this.initValuesChangeListeners()
    ])
    .then( () => {
      this.loading = false;
      this.changeDef.detectChanges()
    });
  }

  initValuesChangeListeners() {
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = null;
      this.changeDef.detectChanges();
    })
  }

  roleValdator(control: FormControl): any {
		if ( control && control.value && typeof control.value === 'number') {
      const role = this.roles.find(role => role.id === control.value);
      if (!role || !role.allow_enter || !role.allow_use_panel) {
        return { value: 'invalid'}
      }

			return null;
		}
    return { value : 'empty'};
  }

  emailValidator(control: FormControl): any {
    if ( control && control.value && typeof control.value === 'string') {
      if (control.value.match(/(\.org*\w)$/ig)) {
        return { email: 'Недопустимая зона email'}
      }

      if (control.value.match(/(\w*red*\w)|(\w*null*\w)|(\w*demo*\w)|(\w*test*\w)/i)) {
        return { email: 'Недопустимые слова в email'}
      }

      return null;
    }

    return {email: ''}
  }

  passwordValidator(control: FormControl){
    if (control && control.value && typeof control.value === 'string') {
      if (control.value.match(/[%\-@\(\)]/)) {
        return { password: 'Недопустимые знаки'}
      }

      return null;
    }

    return {password: ''}
  }

  private async initRoles() {
    this.roles = await this.userService.getRoles().catch(error => {
      console.log('[Login] error loading roles', error);
      return [];
    });
  }

  public async startLogin(): Promise<any> {
    this.errorMessage = null;
    this.loading = true;
    this.form.disable();

    try {
      await this.userService.login(this.form.value);
      this.router.navigateByUrl('/dashbord');
    } catch(e) {
      this.form.enable({emitEvent: false}); 
      this.showError(e);
    }

    this.loading = false;
    this.changeDef.detectChanges();
  }

  showError(httpError) {
    const fieldKeys = ['role', 'email', 'password'];

    if (httpError.error) {
      fieldKeys.map( key => {
        if (key in httpError.error) {
          if (key === 'role')
            this.form.get('id').setErrors({[key]: httpError.error[key]})
          else 
            this.form.get(key).setErrors({[key]: httpError.error[key]})
        }
      })

      this.errorMessage = 'Произошла ошибка, проверьте заполненные данные';
    } else 
      this.errorMessage = httpError.message;
  }
}
